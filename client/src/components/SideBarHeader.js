import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import happyChatter from "../assets/happy-chatter.png";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sideBarHeader: {
    height: 100,
    width: "85%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& div": {
      display: "flex",
    },
  },
  sideBarImgWrapper: {
    "& span": {
      position: "relative",
      left: "-32%",
      top: "75%",
    },
  },
  sideBarImg: {
    borderRadius: "100%",
    overflow: "hidden",
    width: "70px",
    marginRight: theme.spacing(1),
  },
  statusIcon: {
    width: 12,
    height: 12,
    border: "solid white 1px",
    borderRadius: "50%",
  },
  onlineIcon: { background: "#4DED84" },
  offlineIcon: { background: "lightgray" },
}));

const SideBarHeader = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.sideBarHeader}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img src={happyChatter} className={classes.sideBarImg} />
          <span
            className={`${classes.statusIcon} ${classes.onlineIcon}`}
          ></span>
        </div>
        <Typography variant="h5" display="inline">
          Steven
        </Typography>
      </div>
      <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
    </div>
  );
};

SideBarHeader.propTypes = {};

export default SideBarHeader;
