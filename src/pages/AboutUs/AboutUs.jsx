import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* About Us Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">About Us</h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg">
          Welcome to HomeNest, your trusted partner in real estate. We provide
          high-quality properties and personalized services to make your
          property buying, renting, or selling experience seamless and
          enjoyable. Our mission is to create a platform where you can find your
          dream property effortlessly.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 dark:text-gray-100">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md dark:shadow-lg flex flex-col items-center text-center">
            <img
              src="https://img.icons8.com/ios-filled/80/26e07f/handshake.png"
              alt="Trust"
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
              Trusted Service
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              We prioritize your satisfaction and provide reliable services you
              can trust.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md dark:shadow-lg flex flex-col items-center text-center">
            <img
              src="https://img.icons8.com/?size=100&id=81245&format=png&color=000000"
              alt="Quality Properties"
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
              Quality Properties
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              We offer a wide range of verified and premium properties for sale
              or rent.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md dark:shadow-lg flex flex-col items-center text-center">
            <img
              src="https://img.icons8.com/ios-filled/80/26e07f/customer-support.png"
              alt="Support"
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
              24/7 Support
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our dedicated team is available round-the-clock to assist you with
              any queries or support you need.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
