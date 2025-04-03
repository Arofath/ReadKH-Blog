import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import RootLayout from "./components/layout/RootLayout.jsx";
import Login from "./pages/AuthPage/Login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
        </Route>
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
