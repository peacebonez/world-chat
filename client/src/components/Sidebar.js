import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import SideBarHeader from './SideBarHeader';
import SideBarSearch from './SideBarSearch';
import Contacts from './Contacts';
import ChatList from './ChatList';
import Invites from './Invites';

import { UserContext } from '../App';

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
  },
  listContainer: {
    width: '85%',
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
}));

const Sidebar = (props) => {
  const [chatShown, setChatShown] = useState(false);
  const [contactsShown, setContactsShown] = useState(false);
  const [invitesShown, setInvitesShown] = useState(true);
  const classes = useStyles();
  const user = useContext(UserContext);

  //TODOS
  //Fetch user
  //get contacts from user
  //get converstations from user
  //map out both to their respective components

  useEffect(() => {
    console.log('UserContext:', user);
  });

  return (
    <div className={classes.sideBar}>
      <SideBarHeader />
      <SideBarSearch
        setChatShown={setChatShown}
        setContactsShown={setContactsShown}
        setInvitesShown={setInvitesShown}
      />
      <div className={classes.listContainer}>
        {chatShown && <ChatList />}
        {contactsShown && <Contacts />}
        {invitesShown && <Invites />}
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
