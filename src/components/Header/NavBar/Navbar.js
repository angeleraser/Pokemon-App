import React from "react";
import { useState } from "react";
import MenuButton from "./MenuButton";
import { Menu } from "./Menu";
const Navbar = () => {
  const [hidden, sethidden] = useState(true);
  return (
    <div className="flex nav-bar flex-col w-full items-center">
      <MenuButton displayMenu={sethidden} isActive={hidden} />
      <Menu hiddenMenu={sethidden} isHidden={hidden} />
    </div>
  );
};

export default Navbar;
