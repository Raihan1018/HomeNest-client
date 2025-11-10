import React from "react";
import Lottie from "lottie-react";
import animationData from "../../Animation/404.json";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      {/* Lottie Animation */}
      <div className="w-full max-w-md">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Error Message */}
      <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mt-6 text-center">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mt-4 text-center max-w-md">
        The page you are looking for does not exist or has been moved. Don’t
        worry, you can go back home.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="mt-6 inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
