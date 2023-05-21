export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center bg-black text-white">
      <h1
        className="next-error-h1"
        style={{
          display: "inline-block",
          margin: "0 20px 0 0",
          paddingRight: "23px",
          fontSize: "24px",
          fontWeight: 500,
          verticalAlign: "top",
          lineHeight: "49px",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "49px",
          margin: "0",
        }}
      >
        This page could not be found.
      </h2>
    </div >
  )
}

