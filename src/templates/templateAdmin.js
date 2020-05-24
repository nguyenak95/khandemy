import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminLayout = (props) => {
  return (
    <>
      <Navbar />
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
