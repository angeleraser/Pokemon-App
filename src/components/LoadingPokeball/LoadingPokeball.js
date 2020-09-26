import React from "react";
import "./css/LoadingPokeball.css";
import { Error404 } from "./Error404";
export const LoadingPokeball = ({ error, fetchAction }) => {
  return error !== "Error 404" ? (
    <div className="loading-pokeball flex flex-col items-center w-full">
      {!!error && (
        <>
          <h2>Oopps, it looks like you're offline :(</h2>
          <p>Please, check your network connection and try again.</p>
        </>
      )}
      <div
        onClick={() => {
          !!error && fetchAction();
        }}
        className={`pokeball${!!error ? " error" : ""}`}>
        <div className="pokeball__button"></div>
      </div>
      <p> {!!error ? "Click on the pokeball to reload" : "Loading..."}</p>
    </div>
  ) : (
    <div className="loading-pokeball flex flex-col items-center w-full">
      <Error404 />
    </div>
  );
};
