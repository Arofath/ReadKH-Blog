import React from "react";
import NavbarComponents from "./NavBarComponent";
import { Outlet } from "react-router";
import FooterComponents from "./FooterComponent";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComponents />
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-20 flex-1">
        <Outlet />
      </main>
      <FooterComponents />
    </div>
  );
}
