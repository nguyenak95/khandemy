import React from "react";
import { Route } from "react-router-dom";

const LoginLayout = (props) => {
  return (
    <>
      {props.children}
    </>
  );
};

export const LoginTemplate = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <LoginLayout>
            <Component {...props} />
          </LoginLayout>
        );
      }}
    />
  );
};
