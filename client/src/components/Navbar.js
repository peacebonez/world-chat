import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import testFlag from "../assets/testflag.jpg";
import { Typography, Switch } from "@material-ui/core";

//TODOS
//Will have 2 types of Navbars- group and one-on-one

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.navBar}>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={testFlag} />
          <Typography variant="h5">Santiago</Typography>
          {/* background will depend on online status */}
          <span
            className={classes.onlineIcon}
            style={{ background: "#4DED84" }}
          ></span>
          <Typography variant="subtitle1">Online</Typography>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle2">Original Language</Typography>
        <Switch color="primary" name="language" />
        <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
