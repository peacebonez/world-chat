import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";

import SideBarHeader from "./SideBarHeader";

const Sidebar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.sideBar}>
      <SideBarHeader />
      <h1>SideBar</h1>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
