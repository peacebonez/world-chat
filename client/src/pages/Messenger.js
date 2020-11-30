import React, { useContext, useEffect } from 'react';
import { Container, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../contexts/userContext';
import Sidebar from '../components/Sidebar';
import Conversation from '../components/Conversation';

const useStyles = makeStyles((theme) => ({
  messengerContainer: {
    boxSizing: 'border-box',
    background: theme.palette.primary.gray,
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
}));

const Messenger = (props) => {
  const { userState, userActions } = useContext(UserContext);

  const classes = useStyles();

  useEffect(() => {
    // Every time the user changes, because this component is one of the main components
    // you'll be able to track it here for now
    // You don't need to include it here if you don't need it in the future
    console.log('window.screen.width:', window.screen.width);
    if (window.screen.width < 501) {
      userActions.appMobileMode();
    } else {
      userActions.appBigScreenMode();
    }
  }, [window.screen.width]);

  return (
    <Container className={classes.messengerContainer}>
      <Sidebar />
      <Conversation />
    </Container>
  );
};

export default Messenger;
