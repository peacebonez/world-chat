import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";
import { Container } from "@material-ui/core";

import SideHeader from "./SideHeader";

const Sidebar = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.sideBar}>
      <SideHeader />
      <h1>SideBar</h1>
    </Container>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
