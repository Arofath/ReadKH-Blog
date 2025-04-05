import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import RootLayout from "./components/layout/RootLayout.jsx";
import Login from "./pages/AuthPage/Login.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Register from "./pages/AuthPage/Register.jsx";
import Profile from "./pages/Profile.jsx";
import CreatePost from "./pages/CreatePost/CreatePost.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
