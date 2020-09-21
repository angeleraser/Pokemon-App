import React from "react";
import { useState } from "react";
import MenuButton from "./MenuButton";
import { Menu } from "./Menu";
import "./css/NavBar.css";
const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex nav-bar flex-col w-full items-center">
      <MenuButton displayMenu={setShow} isActive={show} />
      <Menu hiddenMenu={setShow} isHidden={show} />
    </div>
  );
};

export default Navbar;
