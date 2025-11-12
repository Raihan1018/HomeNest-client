import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { WhatsApp } from "../../Icon/WhatsApp";
import { GoogleMaps } from "../../Icon/GoogleMap";
import { GitHub } from "../../Icon/GitHub";

const Footer = () => {
  return (
    <footer className=" py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Website Name */}
        <div>
          <Logo />
          <p className="mt-3 text-sm">
            Modern Real Estate Solutions built to simplify your property
            experience with innovation and trust.
          </p>
        </div>

        {/* Contact Icons */}
        <div className="text-center mx-auto">
          <h4 className="font-semibold text-lg mb-4 ">Contact Us</h4>
          <div className="flex items-center gap-4">
            <Link
              to="mailto:raihanuddinahmed10@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition transform"
            >
              <FaEnvelope size={24} className="text-red-500" />
            </Link>
            <Link
              to="https://wa.me/8801611642648"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition transform"
            >
              <WhatsApp width={24} height={24} />
            </Link>
            <Link
              to="https://www.google.com/maps/place/Gulshan+1,+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition transform"
            >
              <GoogleMaps width={24} height={24} />
            </Link>
            <Link
              to="https://github.com/Raihan1018"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition transform"
            >
              <GitHub width={24} height={24} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-emerald-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-emerald-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/all-properties"
                className="hover:text-emerald-600 transition"
              >
                All Properties
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-emerald-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-emerald-600 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center mx-auto">
          <h4 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
            Follow Us
          </h4>
          <div className="flex gap-4">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:scale-110 transition transform"
            >
              <FaFacebookF size={20} />
            </Link>

            <Link
              to="https://instagram.com"
              target="_blank"
              href="https://instagram.com"
              rel="noopener noreferrer"
              className="text-pink-500 hover:scale-110 transition transform"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              to="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:scale-110 transition transform"
            >
              <FaLinkedinIn size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} HomeNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
