import React from "react";
import { pikachuSvg } from "../../svg-icons";
export const Error404 = () => {
  return (
    <>
      {pikachuSvg}
      <h2>Oopps, there is not pokemon :(</h2>
      <p>Please, try to search another name.</p>
    </>
  );
};
