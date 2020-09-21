import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { HomeScreen } from "../../components/Home/HomeScreen";
import PCScreen from "../../components/PC/PCScreen";
import { DetailsScreen } from "../../components/PokemonDetails/DetailsScreen";

export const DashboardRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={HomeScreen} />
      <Route exact path="/pokemon/:pokemon" component={DetailsScreen} />
      <Route path="/pc" exact component={PCScreen} />
      <Redirect to="/" /> {/* To control undefined routes  */}
    </Switch>
  );
};
