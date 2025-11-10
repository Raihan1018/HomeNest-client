import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import loginAnimation from "../../Animation/loginAnimation.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    setLoading(true);
    toast.dismiss();

    signInUser(email, password)
      .then(() => {
        e.target.reset();
        toast.success("Login Successful", { duration: 3000 });
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        toast.error(error.message, { duration: 5000 });
      })
      .finally(() => setLoading(false));
  };

  // Google Login
  const handleGoogleSignIn = () => {
    setLoading(true);
    toast.dismiss();

    signInWithGoogle()
      .then(() => {
        toast.success("Google Login Successful", { duration: 3000 });
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        toast.error(error.message, { duration: 5000 });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ">
      {/* Animation Section */}
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Lottie
          animationData={loginAnimation}
          loop
          className="max-w-sm md:max-w-md lg:max-w-lg"
        />
      </motion.div>

      {/* Form Section */}
      <motion.div
        className="card w-full max-w-md mx-auto bg-base-300 shadow-2xl border border-green-500/20 backdrop-blur-sm"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center text-green-400 mb-6">
            Login to Your Account
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="text-gray-300 font-medium">Email</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="input input-bordered w-full pl-10 bg-base-200 text-gray-100 border-gray-600 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="text-gray-300 font-medium">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="input input-bordered w-full pl-10 pr-10 bg-base-200 text-gray-100 border-gray-600 focus:border-green-500 focus:outline-none"
                />
                <div
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <label className="label">
                <Link
                  to="/forgot-password"
                  state={{ email: emailInput }}
                  className="link link-hover text-sm text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="btn bg-green-500 px-6 py-2 text-black w-full font-semibold flex justify-center"
              >
                {loading ? (
                  <span className="loading loading-spinner text-black"></span>
                ) : (
                  "Login"
                )}
              </motion.button>
            </div>
          </form>

          <div className="divider text-gray-400">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn bg-white text-black border-[#e5e5e5] flex items-center justify-center gap-2"
          >
            {/* Google Icon SVG */}
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="link text-green-400 hover:text-green-300 underline"
            >
              Sign-Up now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
