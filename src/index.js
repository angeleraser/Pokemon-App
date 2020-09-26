import React from "react";
import ReactDOM from "react-dom";
import "./css/tailwind/tailwind.output.css";
import { AppContext } from "./PokemonContext/PokemonContext";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routers/AppRouter";
import "animate.css";
const ROOT = document.getElementById("root");
const App = () => {
  return (
    <BrowserRouter>
      <AppContext>
        <AppRouter />
      </AppContext>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, ROOT);
