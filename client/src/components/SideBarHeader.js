import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import happyChatter from "../assets/5e4a118a03239f87632c8f33899048fd2c4af1ca.png";
import { Typography } from "@material-ui/core";

const SideBarHeader = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.sideBarHeader}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img src={happyChatter} className={classes.sideBarImg} />
          {/* background will depend on online status */}
          <span
            className={classes.onlineIcon}
            style={{ background: "#4DED84" }}
          ></span>
        </div>
        <h4>Steven</h4>
      </div>

      <div>
        <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
      </div>
    </div>
  );
};

SideBarHeader.propTypes = {};

export default SideBarHeader;
