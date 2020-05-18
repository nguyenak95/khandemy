import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/Header";

const AdminLayout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export const AdminTemplate = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <AdminLayout>
            <Component {...props} />
          </AdminLayout>
        );
      }}
    />
  );
};
