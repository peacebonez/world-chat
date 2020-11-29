import React, { useContext, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ChatWindow from './ChatWindow';
import Navbar from './Navbar';
import { UserContext } from '../contexts/userContext';

console.log('window.innerWidth:', window.innerWidth);

const useStyles = makeStyles((theme) => ({
  conversation: {
    background: theme.palette.primary.gray,
    height: '100vh',
    width: '66.66%',
    position: 'absolute',
    right: 0,
    [theme.breakpoints.down('sm')]: {
      transform: 'translateX(200%)',
    },
  },
  conversationFullScreen: {
    transform: 'translateX(-250%)',
    width: '100%',
  },
}));

const Conversation = () => {
  const classes = useStyles();
  const { userState, userActions } = useContext(UserContext);

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
