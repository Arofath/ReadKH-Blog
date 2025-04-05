import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { username, email, password, confirmPassword } = formData;

        if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("All fields are required!");
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Invalid email format.");
            return false;
        }

        if (username.length < 3) {
            setError("Username must be at least 3 characters.");
            return false;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setLoading(true);
        try {
            const { username, email, password } = formData;
            const registerData = { username, email, password };

            console.log("Sending to API:", registerData);

            const response = await fetch(`https://readkh-api.istad.co/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("API error response:", result);
                throw new Error(result.message || "Something went wrong please try again by chenking your data.");
            }

            console.log("Registration success:", result);
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl p-4">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-2xl font-medium text-gray-700">Welcome!</h2>
                        <div className="mt-6">
                            <h1 className="text-3xl font-semibold text-gray-700">Sign Up to</h1>
                            <p className="text-lg font-medium text-gray-600 mt-1">READKH</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-300"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-300"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
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

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-300"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-3 text-gray-500"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-center mb-4">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#A27B5C] hover:bg-gray-500 text-white py-3 rounded-full transition-colors"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Have an account?{" "}
                            <NavLink to="/login" className="text-[#A27B5C] hover:underline font-medium">
                                Login
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
                                    src="src/img/logo.png"
                                    alt="ReadKH Notebooks"
                                    className="mx-20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
