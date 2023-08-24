import mongoose from "mongoose";

interface Connection {
  isConnected: boolean;
}

const connection: Connection = {
  isConnected: false,
};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    const state = mongoose.connections[0].readyState;
    if (state === 1) {
      connection.isConnected = true;
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  const uri = process.env.MONGODB_URI ?? ""; // Ensure fallback value if undefined
  const db = await mongoose.connect(uri);

  console.log('new connection');

  connection.isConnected = db.connections[0].readyState === 1;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
