import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";

import SideBarHeader from "./SideBarHeader";
import SideBarSearch from "./SideBarSearch";

const Sidebar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.sideBar}>
      <SideBarHeader />
      <SideBarSearch />
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
