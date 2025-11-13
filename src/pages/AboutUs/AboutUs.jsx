import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Trusted Service",
    description:
      "We prioritize your satisfaction and provide reliable services you can trust.",
    icon: "https://img.icons8.com/ios-filled/80/26e07f/handshake.png",
  },
  {
    title: "Quality Properties",
    description:
      "We offer a wide range of verified and premium properties for sale or rent.",
    icon: "https://img.icons8.com/?size=100&id=81245&format=png&color=000000",
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated team is available round-the-clock to assist you with any queries or support you need.",
    icon: "https://img.icons8.com/ios-filled/80/26e07f/customer-support.png",
  },
  {
    title: "Easy Search & Filter",
    description:
      "Find properties quickly with our powerful search and filtering options.",
    icon: "https://img.icons8.com/ios-filled/80/26e07f/search.png",
  },
  {
    title: "Secure Transactions",
    description:
      "All property transactions are secured to give you peace of mind.",
    icon: "https://img.icons8.com/ios-filled/80/26e07f/lock.png",
  },
  {
    title: "User-Friendly Platform",
    description:
      "Navigate effortlessly and access all property details with ease.",
    icon: "https://img.icons8.com/?size=100&id=YMJjlOMn5LFY&format=png&color=000000",
  },
];

const faqs = [
  {
    question: "How do I list my property on HomeNest?",
    answer:
      "You can list your property by signing up, logging in, and using the 'Add Property' option from your dashboard.",
  },
  {
    question: "Is it safe to make transactions on your platform?",
    answer:
      "Yes, all transactions are secured with encryption and verified payment methods to ensure your safety.",
  },
  {
    question: "Can I filter properties by price and location?",
    answer:
      "Absolutely! Our platform offers advanced filtering options to search by price, category, and location.",
  },
  {
    question: "Do you provide support for property-related queries?",
    answer:
      "Yes, our support team is available 24/7 to assist you with any questions or concerns.",
  },
  {
    question: "Can I edit my property listing after publishing?",
    answer:
      "Yes, you can edit your listings anytime from your dashboard to update details or images.",
  },
];

const AboutUs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <title>About Us</title>
      {/* About Us Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 ">About Us</h1>
        <p className=" max-w-3xl mx-auto text-lg">
          Welcome to HomeNest, your trusted partner in real estate. We provide
          high-quality properties and personalized services to make your
          property buying, renting, or selling experience seamless and
          enjoyable. Our mission is to create a platform where you can find your
          dream property effortlessly.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10 ">Why Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 shadow-lg">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className=" p-6 rounded-xl shadow-md dark:shadow-lg flex flex-col items-center text-center transform transition hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="mb-4 w-20 h-20"
              />
              <h3 className="text-xl font-semibold mb-2 ">{feature.title}</h3>
              <p className="">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 ">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className=" rounded-xl shadow-md dark:shadow-lg p-5 cursor-pointer"
              onClick={() => toggleFAQ(idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold ">{faq.question}</h3>
                <span className="text-emerald-500 font-bold text-xl">
                  {openFAQ === idx ? "-" : "+"}
                </span>
              </div>

              <AnimatePresence>
                {openFAQ === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2  text-sm"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
