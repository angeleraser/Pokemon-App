import React from "react";
import "./css/LoadingPokeball.css";
export const LoadingPokeball = ({ error, fetchAction }) => {
  return (
    <div className="loading-pokeball flex flex-col items-center w-full">
      {!!error && (
        <>
          <h2>Oops, it looks like you're offline :(</h2>
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
  );
};
