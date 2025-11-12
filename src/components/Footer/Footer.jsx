import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className=" p-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Logo & Website Name */}
        <div className="flex flex-col items-start">
          <Logo />
          <p className="">Modern Real Estate Solutions</p>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p>Email: info@webestate.com</p>
          <p>Phone: +880 1234 567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* Terms & Social Media Links */}
        <div>
          <h4 className="font-semibold mb-2">Links</h4>
          <ul className="space-y-1">
            <li>
              <Link to="#" className="hover:text-emerald-600 transition">
                Terms & Conditions
              </Link>
            </li>
            <li className="flex gap-3 mt-2">
              <Link to="#" className="hover:text-emerald-600 transition">
                <FaFacebookF />
              </Link>
              <Link to="#" className="hover:text-emerald-600 transition">
                <FaTwitter />
              </Link>
              <Link to="#" className="hover:text-emerald-600 transition">
                <FaInstagram />
              </Link>
              <Link to="#" className="hover:text-emerald-600 transition">
                <FaLinkedinIn />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} WebEstate. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
