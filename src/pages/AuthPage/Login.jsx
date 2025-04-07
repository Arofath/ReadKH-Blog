import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [validationError, setValidationError] = useState(""); // State for validation errors

  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate form inputs
  const validateInputs = () => {
    if (!formData.username.trim()) {
      return "Username is required.";
    }
    // if (formData.username.length < 3) {
    //   return "Username must be at least 3 characters long.";
    // }
    if (!formData.password.trim()) {
      return "Password is required.";
    }
    // if (formData.password.length < 6) {
    //   return "Password must be at least 6 characters long.";
    // }
    return "";
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any existing error messages
    setValidationError(""); // Clear validation errors

    const validationMessage = validateInputs();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    const loginData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const result = await response.json();
      localStorage.setItem("authToken", result.access_token);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message); // Set error message state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl p-4">
        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          {/* Logo Header */}
          <div className="text-center -mt-15 md:-mt-15">
            <img
              src="/images/logo/logo.png"
              alt="ReadKH Logo"
              className=" mx-auto h-40 sm:h-24 md:h-40 w-auto object-contain"
            />
            <h1 className="mb-10 text-2xl font-semibold text-gray-700 -mt-10  md:-mt-10">
              Join The ReadKH Community
            </h1>
          </div>

          {/* <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-700">Welcome!</h2>
            <div className="mt-6">
              <h1 className="text-3xl font-semibold text-gray-700">Sign in to</h1>
              <p className="text-lg font-medium text-gray-600 mt-1">READKH</p>
            </div>
          </div> */}

          {validationError && (
            <div className="mb-4 text-red-500 text-sm">
              {validationError}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-300"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your Password"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-300"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute right-4 top-3 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-brown-500 focus:ring-brown-400 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm text-gray-600 hover:underline font-bold">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-brown-400 hover:bg-gray-500 bg-[#A27B5C] text-white py-3 rounded-full transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
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
            <div className="flex justify-center mb-4 ">
              <img
                src="/images/logo/logo.png"
                alt="ReadKH Blog"
                className="mx-20"
              />
            </div>

            {/* Blog Description */}
            <p className="text-gray-700 text-base md:text-lg max-w-xl mx-auto px-4 -mt-40">
              A modern blog for sharing ideas, stories, and insights from writers around the world.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}