import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import testFlag from "../assets/testflag.jpg";
import { Typography, Switch } from "@material-ui/core";

//TODOS
//Will have 2 types of Navbars: group and one-on-one

const Navbar = (props) => {
  const useStyles = makeStyles((theme) => ({
    navBar: {
      width: "100%",
      padding: "0 25px",
      height: 100,
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& img": {
        width: "10%",
        borderRadius: "50%",
      },
    },
    dotMenu: {
      cursor: "pointer",
      color: "#BCC8D9",
    },
    onlineIcon: {
      width: 12,
      height: 12,
      border: "solid white 1px",
      borderRadius: "50%",
    },
  }));

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
