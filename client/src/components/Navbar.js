import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.navBar}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img src="" className={classes.sideBarImg} />
          {/* background will depend on online status */}
          <span style={{ background: "#4DED84" }}></span>
        </div>
        <h4>Steven</h4>
      </div>
      <div>
        <MoreHorizIcon></MoreHorizIcon>
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
