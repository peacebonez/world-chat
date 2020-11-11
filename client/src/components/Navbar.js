import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import testFlag from "../assets/testflag.jpg";

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.navBar}>
      <div>
        <div>
          <img src={testFlag} />
          {/* background will depend on online status */}
          <span style={{ background: "#4DED84" }}></span>
        </div>
      </div>
      <div>
        <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
