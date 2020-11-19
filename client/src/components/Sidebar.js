import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SideBarHeader from './SideBarHeader';
import SideBarSearch from './SideBarSearch';
import Contacts from './Contacts';
import ChatList from './ChatList';
import Invites from './Invites';

const useStyles = makeStyles((theme) => ({
  sideBar: {
    width: '33.33%',
    background: theme.palette.primary.gray,
    position: 'absolute',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '100%',
    },
  },
  listContainer: {
    width: '85%',
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
}));

const Sidebar = (props) => {
  const [chatsShown, setChatsShown] = useState(false);
  const [contactsShown, setContactsShown] = useState(false);
  const [invitesShown, setInvitesShown] = useState(true);
  const classes = useStyles();

  //TODOS
  //Fetch user
  //get contacts from user
  //get converstations from user
  //map out both to their respective components

  return (
    <div className={classes.sideBar}>
      <SideBarHeader />
      <SideBarSearch
        chatsShown={chatsShown}
        invitesShown={invitesShown}
        contactsShown={contactsShown}
        setChatsShown={setChatsShown}
        setContactsShown={setContactsShown}
        setInvitesShown={setInvitesShown}
      />
      <div className={classes.listContainer}>
        {chatsShown && <ChatList />}
        {contactsShown && <Contacts />}
        {invitesShown && <Invites />}
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
