import React from "react";
import "./css/Header.css";
import Navbar from "./NavBar/Navbar";
export const Header = () => {
  return (
    <header className="header relative w-full flex items-center justify-between">
      <img src="/images/png/pokemon-logo.png" alt="pokemon logo" />
      <Navbar />
    </header>
  );
};
