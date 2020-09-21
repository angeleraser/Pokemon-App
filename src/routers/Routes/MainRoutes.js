import { Redirect, Route } from "react-router";
import React from "react";
export const MainRoutes = ({ enabled, component: Component, ...rest }) => {
  return (
    <Route {...rest}>
      {!enabled ? <Component /> : <Redirect to="/arena/:pokemon" />}
    </Route>
  );
};
