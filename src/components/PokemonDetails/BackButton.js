import React from "react";
import { useHistory } from "react-router";
import { arrowLeftIcon } from "../../svg-icons";

export const BackButton = () => {
  const history = useHistory();
  return (
    <button
      onClick={() => {
        if (history.length === 0) {
          history.push("/");
        } else {
          history.goBack();
        }
      }}
      className="back-button flex justify-center items-center">
      {" "}
      {arrowLeftIcon}Back
    </button>
  );
};
