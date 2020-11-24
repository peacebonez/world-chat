import React, {useEffect} from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import ChatWindow from "./ChatWindow";

import Navbar from "./Navbar";


const useStyles = makeStyles((theme) => ({
  conversation: {
    background: theme.palette.primary.gray,
    height: "100vh",
    width: "66.66%",
    position: "absolute",
    right: 0,
  },
}));

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
