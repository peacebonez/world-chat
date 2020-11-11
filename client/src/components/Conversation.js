import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import ChatWindow from "./ChatWindow";

import Navbar from "./Navbar";

const Conversation = (props) => {
  const useStyles = makeStyles((theme) => ({
    conversation: {
      background: "#F5F7FB",
      height: "100vh",
      width: "66.66%",
      position: "absolute",
      right: 0,
    },
  }));
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
