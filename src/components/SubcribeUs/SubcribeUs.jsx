import React, { useState } from "react";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";

const SubscribeUs = () => {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // fake toast
    setShowToast(true);
    setEmail("");

    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className=" rounded-xl shadow-lg  max-w-md w-full relative">
        <h2 className="text-3xl font-bold mb-4  text-center">
          Subscribe to Our Newsletter
        </h2>
        <p className=" mb-6 text-center">
          Get the latest updates and offers straight to your inbox.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 " />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 "
              required
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700  py-3 rounded-lg font-medium transition"
          >
            Subscribe
          </button>
        </form>

        {/* Fake Toast */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-emerald-500  px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-out z-50">
            <FaCheckCircle className="" />
            <span>Subscribed successfully!</span>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateY(20px); }
            10%, 90% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-out {
            animation: fadeInOut 3s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default SubscribeUs;
