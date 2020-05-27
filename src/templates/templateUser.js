import React from "react";
import { Route } from "react-router-dom";
import SideBar from '../components/Sidebar'
export const UserTemplate = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <SideBar>
            <Component {...props} />
          </SideBar>
        );
      }}
    />
  );
};
