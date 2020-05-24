import React from "react";
import { Route } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomeLayout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

export const HomeTemplate = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <HomeLayout>
            <Component {...props} />
          </HomeLayout>
        );
      }}
    />
  );
};
