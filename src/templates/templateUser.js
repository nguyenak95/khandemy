import React from "react";
import { Route } from "react-router-dom";

const UserLayout = (props) => {
  return (
    <>
      {props.children}
    </>
  );
};

export const UserTemplate = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <UserLayout>
            <Component {...props} />
          </UserLayout>
        );
      }}
    />
  );
};
