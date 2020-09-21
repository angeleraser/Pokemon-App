import React from "react";
import "./css/MenuButton.css";
const MenuButton = ({ displayMenu, isActive }) => {
  return (
    <button
      onClick={() => {
        displayMenu((prev) => !prev);
      }}
      className={`menu-button flex-col flex items-center ${
        isActive ? "active" : ""
      }`}>
      <span className="line"></span>
    </button>
  );
};

export default MenuButton;
