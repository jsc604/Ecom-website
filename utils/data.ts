import bcrypt from "bcryptjs";

export const data = {
  users: [
    {
      name: "John Doe",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jane Foster",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Bentley Wheels",
      slug: "bentley-wheels",
      category: "wheels",
      images: ["/../public/images/bentley back.jpg"],
      isFeatured: true,
      featuredImage: "/../public/images/bentley back.jpg",
      options: [
        { size: "One Wheel", price: 1200, countInStock: 20 },
        { size: "Set of 4", price: 4400, countInStock: 20 },
      ],
      brand: "Bentley",
      rating: 4.5,
      numReviews: 10,
      description:
        "The Bentley wheels are the epitome of luxury and craftsmanship. Known for their unmatched elegance and sophistication, these wheels add an air of prestige to any vehicle they adorn. Crafted with precision, each wheel embodies the spirit of Bentley - the pursuit of perfection. They are designed to enhance your car's aesthetic appeal without compromising on its performance. With a high gloss finish that radiates under the sun, they are sure to turn heads wherever you go. Bentley wheels are more than just car accessories, they are a statement of style, luxury and first-class craftsmanship.",
    },
    {
      name: "Graphic Print",
      slug: "graphic-print",
      category: "accessories",
      images: ["/../public/images/Big Fat Grapic House.jpeg"],
      isFeatured: true,
      featuredImage: "/../public/images/Big Fat Grapic House.jpeg",
      options: [
        { size: '8" x 11"', price: 80, countInStock: 20 },
        { size: '12" x 16"', price: 120, countInStock: 20 },
        { size: '16" x 21"', price: 160, countInStock: 4 },
        { size: '20" x 26"', price: 200, countInStock: 0 },
      ],
      brand: "Big Fat",
      rating: 4.2,
      numReviews: 10,
      description:
        "Our vibrant graphic prints are designed to ignite your passion for automobiles and add an artistic flair to your space. This meticulously created art piece showcases a captivating automotive design that exudes energy and movement. Made with high-quality materials, the colors remain vibrant and the lines sharp, ensuring that the print continues to captivate attention over time. This graphic print is not only an accessory but also a conversation starter, evoking the excitement and dynamism of car racing. It's a perfect addition to the living space of any car enthusiast, adding a unique touch of personal style.",
    },
    {
      name: "Camaro Tires",
      slug: "camaro-tires",
      category: "tires",
      images: ["/../public/images/camaro.jpeg"],
      isFeatured: false,
      featuredImage: "/../public/images/camaro.jpeg",
      options: [
        { size: "One Tire", price: 500, countInStock: 20 },
        { size: "Set of 4", price: 1800, countInStock: 20 },
      ],
      brand: "Continental",
      rating: 4.5,
      numReviews: 10,
      description:
        "Take to the road with confidence with our top-of-the-line Camaro tires. Designed for high performance, these tires provide unparalleled grip and control, making every drive smooth and enjoyable. The advanced tread pattern ensures optimal road contact, improving your vehicle's acceleration, braking, and cornering capabilities. Made by Continental, a brand renowned for its commitment to safety and innovation, these tires are built to last, offering robustness and longevity. Whether you're cruising on the highway or navigating through the city, Camaro tires promise a driving experience like no other.",
    },
    {
      name: "Steering Wheel",
      slug: "steering-wheel",
      category: "accessories",
      images:[ "/../public/images/chevelle interior.jpeg"],
      isFeatured: false,
      featuredImage: "/../public/images/chevelle interior.jpeg",
      options: [{ size: "one size", price: 250, countInStock: 20 }],
      brand: "Chevrolet",
      rating: 4.5,
      numReviews: 10,
      description:
        "This vintage Chevrolet steering wheel is a classic car accessory that blends functionality with style. It features a sleek design that enhances the interior aesthetics of your vehicle while providing superior comfort and control. The robust construction ensures durability, and the ergonomic grip offers a smooth, comfortable driving experience. This steering wheel is not merely a car accessory but a piece of history, bringing a touch of the golden age of motoring into your vehicle. Experience the thrill of the drive like never before with this iconic Chevrolet steering wheel.",
    },
    {
      name: "Polishing Agent",
      slug: "polishing-agent",
      category: "accessories",
      images: ["/../public/images/Koch Chemie.png"],
      isFeatured: false,
      featuredImage: "/../public/images/Koch Chemie.png",
      options: [
        { size: "500ml", price: 55, countInStock: 20 },
        { size: "1 litre", price: 95, countInStock: 20 },
        { size: "2 litres", price: 160, countInStock: 20 },
      ],
      brand: "Koch Chemie",
      rating: 4.5,
      numReviews: 10,
      description:
        "Our Koch Chemie Polishing Agent is a must-have accessory for maintaining the gleam of your vehicle. Its advanced formula gently removes surface imperfections and adds a brilliant shine to your car's exterior. The polishing agent is easy to apply and leaves no residue, ensuring a streak-free finish. It also provides a protective layer that guards against environmental damage, keeping your vehicle looking brand new for longer. Whether you're preparing for a car show or simply want your car to shine, our Koch Chemie Polishing Agent delivers professional-grade results every time.",
    },
    {
      name: "Skyline Wheels",
      slug: "skyline-wheels",
      category: "wheels",
      images: ["/../public/images/skyline front.jpeg"],
      isFeatured: false,
      featuredImage: "/../public/images/skyline front.jpeg",
      options: [
        { size: "One Wheel", price: 500, countInStock: 20 },
        { size: "Set of 4", price: 1800, countInStock: 20 },
      ],
      brand: "JDM",
      rating: 4.5,
      numReviews: 10,
      description:
        "Step back into the golden age of motoring with our classic Skyline Wheels. Drawing inspiration from vintage design, these wheels add a timeless charm to any vehicle. Made by JDM, a brand known for its fine craftsmanship, each wheel is meticulously designed to be both aesthetically pleasing and performance-enhancing. The high-quality materials ensure durability, while the polished finish adds a touch of elegance. These wheels not only elevate the look of your vehicle but also improve its performance, offering a smoother, more stable ride. Make a statement with our Skyline Wheels - the perfect blend of style, performance, and vintage charm.",
    },
  ],
};
