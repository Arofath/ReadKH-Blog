import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter username"),
      password: Yup.string().required("Please enter password"),
    }),
    onSubmit: async (values) => {
      setErrorMessage("");
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Invalid username or password");
        }

        const result = await response.json();
        if (rememberMe) {
          localStorage.setItem("authToken", result.access_token);
        } else {
          sessionStorage.setItem("authToken", result.access_token);
        }
        navigate("/");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl p-4">
        {/* Login Form */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
          {/* Logo Header */}
          <div className="text-center -mt-15 md:-mt-15">
            <img
              src="/images/logo/logo.png"
              alt="ReadKH Logo"
              className="block dark:hidden mx-auto h-40 sm:h-24 md:h-40 w-auto object-contain"
            />
            <img
              src="../images/logo/ReadKh-dark mode.png"
              alt="ReadKH Logo"
              className="hidden dark:block mx-auto h-40 sm:h-24 md:h-40 w-auto object-contain"
            />
            <h1 className="mb-10 text-2xl font-semibold text-gray-700 dark:text-gray-100 -mt-10 md:-mt-10">
              Join The ReadKH Community
            </h1>
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3 rounded-lg flex items-start gap-2">
              <AlertCircle
                className="mt-0.5 text-red-500 dark:text-red-400"
                size={18}
              />
              <span>
                <strong className="font-semibold">Login failed:</strong>{" "}
                {errorMessage}
              </span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* Username */}
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-gray-700 dark:text-gray-200 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Enter your username"
                  className={`w-full px-4 py-3 pr-10 rounded-full border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    formik.touched.username && formik.errors.username
                      ? "border-red-500 focus:ring-red-300"
                      : formik.touched.username
                      ? "border-green-500 focus:ring-green-300"
                      : "border-gray-300 dark:border-gray-700 focus:ring-brown-300"
                  }`}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <div className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {formik.errors.username}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-gray-200 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your Password"
                  className={`w-full px-4 py-3 pr-12 rounded-full border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:ring-red-300"
                      : formik.touched.password
                      ? "border-green-500 focus:ring-green-300"
                      : "border-gray-300 dark:border-gray-700 focus:ring-brown-300"
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-brown-500 focus:ring-brown-400 border-gray-300 dark:border-gray-600 rounded"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-300 hover:underline font-bold"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-brown-400 hover:bg-gray-500 bg-[#A27B5C] text-white py-3 rounded-full transition-colors flex justify-center items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Don't have an Account?{" "}
              <NavLink
                to="/register"
                className="text-[#A27B5C] hover:underline font-medium"
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>

        {/* Logo Section */}
        <div className="hidden md:flex items-center justify-center pb-30 -mt-5 ml-10">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/images/logo/logo.png"
                alt="ReadKH Blog"
                className="mx-20 block dark:hidden"
              />
              <img
                src="../images/logo/ReadKh-dark mode.png"
                alt="ReadKH Blog"
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
