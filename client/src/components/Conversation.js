import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ChatWindow from './ChatWindow';

import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  conversation: {
    background: theme.palette.primary.gray,
    height: '100vh',
    width: '66.66%',
    position: 'absolute',
    right: 0,
  },
}));

const Conversation = () => {
  const classes = useStyles();

  return (
    <div className={classes.conversation}>
      <Navbar />
      <ChatWindow />
    </div>
  );
};

export default Conversation;
