import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "../UI/NavLinks/NavLinks";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "../Logo/Logo";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  // Theme switch handler
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
    <div className="navbar  shadow-sm px-4 sticky top-0 left-0 right-0 z-50 bg-base-100">
      {/* Left: Logo + Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown ">
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
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >
            {links}
            {user && (
              <>
                <li>
                  <Link to="/add-properties">Add Property</Link>
                </li>
                <li>
                  <Link to="/my-properties">My Properties</Link>
                </li>
                
              </>
            )}
          </ul>
        </div>

        <Link to={"/"}>
          <Logo />
        </Link>
      </div>

      {/* Center: Navbar links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right: Theme toggle + Login/User */}
      <div className="navbar-end flex items-center gap-3 relative">
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl"
          title="Toggle Theme"
        >
          {theme === "light" ? (
            <FaMoon className="text-gray-700" />
          ) : (
            <FaSun className="text-yellow-400" />
          )}
        </button>

        {!user ? (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="btn btn-outline btn-success hover:bg-emerald-500 hover:border-emerald-500 "
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
              <div className="absolute right-0 mt-2 w-52 bg-base-100 rounded-xl shadow-lg border p-3 z-10">
                <p className=" font-semibold mb-2 underline">
                  {user.displayName || "User"}
                </p>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-lg hover:translate-x-2 duration-200 ease-in-out  mb-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  View Profile
                </Link>
                <Link
                  to="/add-properties"
                  className="block px-3 py-2 rounded-lg hover:translate-x-2 duration-200 ease-in-out mb-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Add Property
                </Link>
                <Link
                  to="/my-properties"
                  className="block px-3 py-2 rounded-lg hover:translate-x-2 duration-200 ease-in-out  mb-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Properties
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg  text-red-500 hover:translate-x-2 duration-200 ease-in-out"
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
