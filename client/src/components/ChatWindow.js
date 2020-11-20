import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import ChatInput from "./ChatInput";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

require('dotenv').config();
const BASE_URL = process.env.REACT_APP_baseURL;
const serverURL = process.env.serverURL;

const useStyles = makeStyles((theme) => ({
  chatWindow: {
    width: "100%",
    height: "85vh",
    background: "#fff",
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const ChatWindow = (props) => {
  const classes = useStyles();

  const [msg, setMsg] = useState({
    name: '',
    message: ''
  });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const socket = io(serverURL);
    socket.on('connect', () => {
      console.log(socket.id);
      console.log(socket.connected);
    })
    
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <div className={classes.chatWindow}>
      chat window!
      <ChatInput />
    </div>
  );
};

ChatWindow.propTypes = {};

export default ChatWindow;
