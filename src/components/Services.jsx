import {
  FaShippingFast,
  FaRegClock,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaMoneyCheckAlt,
  FaMobileAlt,
} from "react-icons/fa";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in major cities. Express delivery in Dhaka within 4–6 hours.",
    icon: <FaShippingFast className="text-4xl text-red-500" />,
  },
  {
    title: "Real-Time Tracking",
    description:
      "Track your parcel from pick-up to delivery in real-time with live location updates.",
    icon: <FaMapMarkedAlt className="text-4xl text-red-500" />,
  },
  {
    title: "Delivery Time Slot Selection",
    description:
      "Choose your preferred time slot for both sending and receiving parcels.",
    icon: <FaRegClock className="text-4xl text-red-500" />,
  },
  {
    title: "Secured Handling",
    description:
      "Every parcel is handled with care, insured, and sealed to ensure complete safety.",
    icon: <FaShieldAlt className="text-4xl text-red-500" />,
  },
  {
    title: "Cash on Delivery (COD)",
    description:
      "Offer cash on delivery for your customers and receive secure daily settlements.",
    icon: <FaMoneyCheckAlt className="text-4xl text-red-500" />,
  },
  {
    title: "Smart Mobile App",
    description:
      "Send, track, and manage deliveries easily using our all-in-one mobile app.",
    icon: <FaMobileAlt className="text-4xl text-red-500" />,
  },
];

const OurServices = () => {
  return (
    <div className="bg-amber-50 py-10 px-6 md:px-12 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Our Services
      </h2>
      <p className="px-44 text-center pb-6">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 text-center hover:bg-lime-300 transition"
          >
            <div className="flex justify-center mb-4">
              {" "}
              <div className="bg-amber-100 p-4 rounded-full">
                {service.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
