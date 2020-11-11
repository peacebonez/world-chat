import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";

import ChatWindow from "./ChatWindow";

import Navbar from "./Navbar";

const Conversation = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.conversation}>
      <Navbar />
      <ChatWindow />
    </div>
  );
};

Conversation.propTypes = {};

export default Conversation;
