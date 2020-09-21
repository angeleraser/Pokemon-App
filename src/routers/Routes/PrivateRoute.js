import React from "react";
import { Redirect, Route } from "react-router";
export const PrivateRoute = ({ enabled, component: Component, ...rest }) => {
  return enabled ? (
    <Route
      {...rest}
      component={(props) => {
        return <Component {...props} />;
      }}
    />
  ) : (
    <Redirect to="/" />
  );
};
