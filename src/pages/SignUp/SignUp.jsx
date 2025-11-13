import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlinePhoto } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import registerAnimation from "../../Animation/registerAnimation.json";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photoURL = e.target.photoURL.value.trim();
    const password = e.target.password.value.trim();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase, one lowercase letter and be at least 6 characters long!"
      );
      return;
    }
    // image URL validation
    const imageUrlRegex =
      /^https?:\/\/.*\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i;

    if (!imageUrlRegex.test(photoURL)) {
      toast.error(
        "Image URL must be a valid URL ending with an image extension (png, jpe,gif,bm,webp,svg)"
      );
      return;
    }

    setLoading(true);
    toast.dismiss();

    try {
      // Create user
      await createUser(email, password);

      // Update profile with name and photo
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL || null,
        });
      }

      toast.success("Account created successfully!", { duration: 2000 });
      e.target.reset();

      setTimeout(() => {
        navigate("/profile");
      }, 300);
    } catch (error) {
      toast.error(error.message, { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full max-w-6xl mx-auto px-4 py-10">
      <title>Sign Up</title>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Animation Section */}
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Lottie
          animationData={registerAnimation}
          loop
          className="max-w-sm md:max-w-md lg:max-w-lg"
        />
      </motion.div>

      {/* Form Section */}
      <motion.div
        className="card w-full max-w-md mx-auto bg-base-300 shadow-2xl border border-purple-500/20 backdrop-blur-sm"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center text-purple-400 mb-6">
            Create a New Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className=" font-medium">Full Name</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 0" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="input input-bordered w-full pl-10 bg-base-200  border-gray-600 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className=" font-medium">Email</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 " />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10 bg-base-200  focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className=" font-medium">Photo URL</span>
              </label>
              <div className="relative">
                <MdOutlinePhoto className="absolute left-3 top-3 " />
                <input
                  type="text"
                  name="photoURL"
                  required
                  placeholder="Enter your Photo URL"
                  className="input input-bordered w-full pl-10 bg-base-200  focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className=" font-medium">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 " />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Create a password"
                  className="input input-bordered w-full pl-10 pr-10  focus:border-purple-500 focus:outline-none"
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <ul className="text-xs  mt-2 list-disc list-inside space-y-1">
                <li>Must contain at least one uppercase letter (A–Z)</li>
                <li>Must contain at least one lowercase letter (a–z)</li>
                <li>Must be at least 6 characters long</li>
              </ul>
            </div>

            {/* Register Button */}
            <div className="form-control mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="btn bg-purple-500 px-6 py-2 text-black w-full font-semibold flex justify-center"
              >
                {loading ? (
                  <span className="loading loading-spinner text-black"></span>
                ) : (
                  "Register"
                )}
              </motion.button>
            </div>
          </form>

          <div className="divider ">OR</div>

          <p className="text-center text-sm ">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link text-purple-400 hover:text-purple-300 underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
