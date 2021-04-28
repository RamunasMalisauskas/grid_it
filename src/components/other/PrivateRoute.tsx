import React from "react";
import { RouteProps, Redirect, Route } from "react-router-dom";
import { auth } from "../../firebase";

export const PrivateRoute = ({
  children,
  ...props
}: React.PropsWithChildren<RouteProps>): JSX.Element => {
  if (!auth.currentUser) return <Redirect to="" />;
  return <Route {...props}>{children}</Route>;
};
