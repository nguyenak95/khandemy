import React from "react";
import { Route } from "react-router-dom";
import UserProfile from "../components/UserProfile"
export const UserTemplate = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <UserProfile {...props} />
      }}
    />
  );
};
