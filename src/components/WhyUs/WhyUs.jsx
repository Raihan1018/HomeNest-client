import React from "react";
import { FaLightbulb, FaUsers, FaRocket } from "react-icons/fa";
import Building_Construction from "../../Animation/Building_Construction.json";
import Lottie from "lottie-react";

const WhyUs = () => {
  const reasons = [
    {
      icon: <FaLightbulb size={30} className="text-blue-500" />,
      title: "Innovative Solutions",
      description:
        "We provide cutting-edge solutions tailored to your business needs, leveraging modern technologies.",
    },
    {
      icon: <FaUsers size={30} className="text-green-500" />,
      title: "Expert Team",
      description:
        "Our team consists of experienced professionals passionate about delivering high-quality results.",
    },
    {
      icon: <FaRocket size={30} className="text-purple-500" />,
      title: "Fast Delivery",
      description:
        "We prioritize efficiency and speed without compromising quality to ensure timely project completion.",
    },
  ];

  return (
    <div>
      {/* Lottie Animation Section */}
      <div className="w-full max-w-4xl mx-auto ">
        <Lottie
          animationData={Building_Construction}
          loop={true}
          autoplay={true}
        />
      </div>

      {/* Reasons Section */}
      <div className=" py-20 px-5 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold  mb-4">
            Why Choose Us?
          </h2>
          <p className=" max-w-2xl mx-auto">
            We combine expertise, innovation, and dedication to provide
            exceptional services that help your business grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className=" p-8 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl border"
            >
              <div className="mb-6">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-3 ">
                {reason.title}
              </h3>
              <p className="">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
