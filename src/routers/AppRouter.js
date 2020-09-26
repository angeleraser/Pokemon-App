import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ArenaScreen } from "../components/Arena/ArenaScreen";
import { Header } from "../components/Header/Header";
import { PokemonContext } from "../PokemonContext/PokemonContext";
import { DashboardRoutes } from "./Routes/DashboardRoutes";
import { MainRoutes } from "./Routes/MainRoutes";
import { PrivateRoute } from "./Routes/PrivateRoute";

export const AppRouter = () => {
  const {
    arena,
  } = useContext(PokemonContext);
  return (
    <Router>
      <Header />
      <Switch>
        <PrivateRoute
          enabled={arena.enabled}
          exact={true}
          component={ArenaScreen}
          path={"/arena/:pokemon"}
        />
        <MainRoutes path={"/"} component={DashboardRoutes} enabled={arena.enabled} />
      </Switch>
    </Router>
  );
};
