import React from "react";
import ReactDOM from "react-dom";
import "./css/tailwind/tailwind.output.css";
import { Header } from "./components/Header/Header";
import { AppContext } from "./PokemonContext/PokemonContext";
import { Home } from "./components/Home/Home";
const ROOT = document.getElementById("root");

const App = () => {
  return (
    <AppContext>
      <Header />
      <Home />
    </AppContext>
  );
};

ReactDOM.render(<App />, ROOT);
