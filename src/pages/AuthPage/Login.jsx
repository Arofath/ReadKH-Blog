import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: "", // Using "username" instead of "email"
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

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", { username, password, rememberMe });
    // Prepare login data
    const loginData = {
      username: formData.username, // Using "username"
      password: formData.password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      console.log("Login successful:", result);
      localStorage.setItem("authToken", result.access_token);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl p-4">
        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-700">Welcome !</h2>

            <div className="mt-6">
              <h1 className="text-3xl font-semibold text-gray-700">
                Sign in to
              </h1>
              <p className="text-lg font-medium text-gray-600 mt-1">READKH</p>
            </div>
          </div>

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
                  Remembebr me
                </label>
              </div>

              <a href="#" className="text-sm text-gray-600 hover:underline">
                Forgot Password ?
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
              Don't have an Account ?{" "}
              <NavLink to="/register"
                className="text-[#A27B5C] hover:underline font-medium"
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>

        {/* Logo Section */}
        <div className="hidden md:flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src="src\img\logo.png"
                  alt="ReadKH Notebooks"
                  className="mx-20"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="text-xl font-bold"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
