import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "At least 3 characters")
        .required("Please Enter Username"),
      email: Yup.string().email("Invalid email").required("Please Enter Email"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters ")
        .matches(/[!@#$%^&*]/, "Include 1 special character.")
        .required("Please Enter Password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please Enter Confirm Password"),
      agreeToTerms: Yup.bool()
        .oneOf([true], "You must agree to the terms and conditions")
        .required("You must agree to the terms and conditions"),
    }),
    onSubmit: async (values, { setTouched, validateForm }) => {
      setError("");

      // Mark all fields as touched
      setTouched({
        username: true,
        email: true,
        password: true,
        confirmPassword: true,
        agreeToTerms: true, // 👈 Important
      });

      // Validate form
      const errors = await validateForm();

      if (Object.keys(errors).length > 0) return;

      setLoading(true);
      try {
        const response = await fetch("https://readkh-api.istad.co/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const result = await response.json();
        console.log("API response:", result); // Keep this for debugging

        if (!response.ok) {
          // This line makes sure you show the exact error
          throw new Error(result.error || "Registration failed.");
        }
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Show success alert for 2 seconds

        formik.resetForm();
      } catch (err) {
        setError(err.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          {/* Logo Header */}
          <div className="text-center -mt-15 md:-mt-15">
            <img
              src="/images/logo/logo.png"
              alt="ReadKH Logo"
              className="block dark:hidden mx-auto h-40 sm:h-24 md:h-40 w-auto object-contain"
            />
            <img
              src="/images/logo/ReadKh-dark mode.png"
              alt="ReadKH Logo"
              className="hidden dark:block mx-auto h-40 sm:h-24 md:h-40 w-auto object-contain"
            />
            <h1 className="mb-10 text-2xl font-semibold text-gray-700 dark:text-gray-100 -mt-10 md:-mt-10">
              Join The ReadKH Community
            </h1>
          </div>

          {error && (
            <div className="mb-4 text-red-600 dark:text-red-300 text-sm bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 p-3 rounded-lg flex items-start gap-2">
              <AlertCircle
                className="mt-0.5 text-red-500 dark:text-red-400"
                size={18}
              />
              <span>{error}</span>
            </div>
          )}

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-800 border border-green-200 dark:border-green-700 p-3 rounded-lg flex items-start gap-2"
              >
                <svg
                  className="mt-0.5 text-green-500 dark:text-green-300"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Registration successful! Redirecting to login...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-300"
                {...formik.getFieldProps("email")}
              />
              <AnimatePresence>
                {formik.touched.email && formik.errors.email && (
                  <motion.div
                    className="text-red-500 dark:text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {formik.errors.email}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-300"
                {...formik.getFieldProps("username")}
              />
              <AnimatePresence>
                {formik.touched.username && formik.errors.username && (
                  <motion.div
                    className="text-red-500 dark:text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {formik.errors.username}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-300"
                  {...formik.getFieldProps("password")}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <AnimatePresence>
                {formik.touched.password && formik.errors.password && (
                  <motion.div
                    className="text-red-500 dark:text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {formik.errors.password}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-300"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <motion.div
                      className="text-red-500 dark:text-red-400 text-sm mt-1"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {formik.errors.confirmPassword}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="w-4 h-4 text-brown-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-brown-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.agreeToTerms}
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 text-sm text-gray-600 dark:text-gray-300"
              >
                I agree to the{" "}
                <a
                  href=""
                  className="underline text-brown-600 hover:text-brown-800"
                >
                  terms and conditions
                </a>
              </label>
            </div>
            {formik.submitCount > 0 && formik.errors.agreeToTerms && (
              <p className="text-red-500 dark:text-red-400 text-sm mb-3">
                {formik.errors.agreeToTerms}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A27B5C] hover:bg-gray-500 dark:hover:bg-gray-700 text-white py-3 rounded-full transition-colors flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Have an account?{" "}
              <NavLink
                to="/login"
                className="text-[#A27B5C] dark:text-[#A27B5C] hover:underline font-medium"
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>

        {/* Logo Section */}
        <div className="hidden md:flex items-center justify-center -mt-50 ml-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/images/logo/logo.png"
                alt="ReadKH Notebooks"
                className="mx-20 dark:hidden block"
              />
              <img
                src="/images/logo/ReadKh-dark mode.png"
                alt="ReadKH Notebooks"
                className="mx-20 hidden dark:block"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-xl mx-auto px-4 -mt-40">
              A modern blog for sharing ideas, stories, and insights from
              writers around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
