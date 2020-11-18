import React, {useEffect} from "react";
import io from 'socket.io-client';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import ChatWindow from "./ChatWindow";

import Navbar from "./Navbar";
require('dotenv').config();

const serverURL = process.env.serverURL;

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

  useEffect(() => {
    let socket = io(serverURL);
    socket.on('connect', () => {
      console.log(socket.id);
      console.log(socket.connected);
    })
    
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);
  return (
    <div className={classes.conversation}>
      <Navbar />
      <ChatWindow />
    </div>
  );
};

Conversation.propTypes = {};

export default Conversation;
