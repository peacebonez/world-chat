import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SideBarHeader from './SideBarHeader';
import SideBarSearch from './SideBarSearch';
import Contacts from './Contacts';
import ChatList from './ChatList';
import Invites from './Invites';

import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  sideBar: {
    direction: 'rtl',
    width: '33.33%',
    background: theme.palette.primary.gray,
    position: 'absolute',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    transition: 'transform .4s',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '100%',
      zIndex: 1,
      overflow: 'hidden',
    },
    [theme.breakpoints.only('md')]: {
      width: '40%',
    },
  },
  sideBarHidden: {
    transform: 'translateX(-100%)',
    transition: 'transform .4s',
  },
  listContainer: {
    width: '100%',
    paddingLeft: theme.spacing(5),
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const { userState } = useContext(UserContext);

  const [chatsShown, setChatsShown] = useState(true);
  const [contactsShown, setContactsShown] = useState(false);
  const [invitesShown, setInvitesShown] = useState(false);

  //TODOS
  //Fetch user
  //get contacts from user
  //get converstations from user
  //map out both to their respective components
  useEffect(() => {
    console.log('cookie: ', document.cookie);
  }, []);
  const handleChatsShow = () => {
    setChatsShown(true);
    setContactsShown(false);
    setInvitesShown(false);
  };
  const handleContactsShow = () => {
    setChatsShown(false);
    setContactsShown(true);
    setInvitesShown(false);
  };
  const handleInvitesShow = () => {
    setChatsShown(false);
    setContactsShown(false);
    setInvitesShown(true);
  };

  return (
    <div
      className={`${classes.sideBar} ${
        userState.isMobileMode && userState.isChatView
          ? classes.sideBarHidden
          : ''
      }`}
    >
      <SideBarHeader />
      <SideBarSearch
        chatsShown={chatsShown}
        invitesShown={invitesShown}
        contactsShown={contactsShown}
        handleChatsShow={handleChatsShow}
        handleContactsShow={handleContactsShow}
        handleInvitesShow={handleInvitesShow}
      />
      <div className={classes.listContainer}>
        {chatsShown && <ChatList />}
        {contactsShown && <Contacts />}
        {invitesShown && <Invites />}
      </div>
    </div>
  );
};

export default Sidebar;
