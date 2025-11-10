import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "../UI/NavLinks/NavLinks";
import logo from "../../assets/logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Navbar links visible to everyone
  const links = (
    <>
      <li>
        <NavLinks to={"/"} address={"Home"} />
      </li>
      <li>
        <NavLinks to={"/all-properties"} address={"All Properties"} />
      </li>
      <li>
        <NavLinks to={"/about"} address={"About"} />
      </li>
      <li>
        <NavLinks to={"/contact"} address={"Contact"} />
      </li>
    </>
  );

  // Logout function
  const handleLogout = () => {
    signOutUser()
      .then(() => {
        setIsDropdownOpen(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have been logged out",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => navigate("/"), 1600);
      })
      .catch((error) => console.error(error));
  };

  const userPhoto =
    user && user.photoURL
      ? user.photoURL
      : "https://i.ibb.co/Z8jQZrJ/default-user.png";

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left: Logo + Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
            {/* Add private links in mobile view if user is logged in */}
            {user && (
              <>
                <li>
                  <Link to="/add-properties">Add Property</Link>
                </li>
                <li>
                  <Link to="/my-properties">My Properties</Link>
                </li>
                <li>
                  <Link to="/my-ratings">My Ratings</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <Link to={"/"}>
          <img src={logo} alt="HomeNest" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Center: Navbar links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right: Login/Signup or User Dropdown */}
      <div className="navbar-end relative">
        {!user ? (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="btn btn-outline btn-success hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-success hover:bg-emerald-600 transition"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={userPhoto}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-emerald-500 hover:scale-105 transition"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border p-3 z-10">
                <p className="text-gray-800 font-semibold mb-2">
                  {user.displayName || "User"}
                </p>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-gray-700 mb-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  View Profile
                </Link>
                <Link
                  to="/add-properties"
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-gray-700 mb-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Add Property
                </Link>
                <Link
                  to="/my-properties"
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-gray-700 mb-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Properties
                </Link>
                <Link
                  to="/my-ratings"
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-gray-700 mb-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Ratings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-red-500"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
