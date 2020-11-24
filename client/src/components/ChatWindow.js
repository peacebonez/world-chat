import React from 'react';
import ChatInput from './ChatInput';

import { makeStyles } from '@material-ui/core/styles';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({
  chatWindow: {
    width: '100%',
    height: '85vh',
    background: '#fff',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const ChatWindow = () => {
  const classes = useStyles();

  return (
    <div className={classes.chatWindow}>
      chat window!
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
