import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ChatWindow from './ChatWindow';
import Navbar from './Navbar';
import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  conversation: {
    background: theme.palette.primary.gray,
    height: '100vh',
    width: '66.66%',
    position: 'absolute',
    right: 0,
  },
  conversationFullScreen: {
    overflow: 'hidden',
    width: '100%',
  },
}));

const Conversation = () => {
  const classes = useStyles();
  const { userState } = useContext(UserContext);

  return (
    <div
      className={`${classes.conversation} ${
        userState.isMobileMode && userState.isChatView
          ? classes.conversationFullScreen
          : ''
      }`}
    >
      <Navbar />
      <ChatWindow />
    </div>
  );
};

export default Conversation;
