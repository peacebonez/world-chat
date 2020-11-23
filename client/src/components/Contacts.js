import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import happyChatter from '../assets/happy-chatter.png';
import PropTypes from 'prop-types';
import Contact from './Contact';
import Invitation from './Invitation';
import { UserContext } from '../contexts/userContext';

const testContacts = [
  { avatar: happyChatter, name: 'Doug', isOnline: true, id: 0 },
  { avatar: happyChatter, name: 'Sandra', isOnline: false, id: 1 },
  { avatar: happyChatter, name: 'Michael', isOnline: false, id: 2 },
  { avatar: happyChatter, name: 'Chet', isOnline: true, id: 3 },
  { avatar: happyChatter, name: 'Kwame', isOnline: false, id: 4 },
  { avatar: happyChatter, name: 'Dong', isOnline: true, id: 5 },
  { avatar: happyChatter, name: 'a', isOnline: true, id: 6 },
  { avatar: happyChatter, name: 'b', isOnline: true, id: 7 },
  { avatar: happyChatter, name: 'c', isOnline: true, id: 8 },
  { avatar: happyChatter, name: 'd', isOnline: true, id: 9 },
  { avatar: happyChatter, name: 'e', isOnline: true, id: 10 },
  { avatar: happyChatter, name: 'f', isOnline: true, id: 11 },
  { avatar: happyChatter, name: 'g', isOnline: true, id: 12 },
  { avatar: happyChatter, name: 'h', isOnline: true, id: 13 },
  { avatar: happyChatter, name: 'i', isOnline: true, id: 14 },
  { avatar: happyChatter, name: 'j', isOnline: true, id: 15 },
];

const useStyles = makeStyles((theme) => ({
  contactsContainer: {
    width: '80%',
  },
  contactList: {
    paddingLeft: 0,
  },
}));

const Contacts = (props) => {
  const { userState } = useContext(UserContext);
  console.log('userState:', userState);

  const classes = useStyles();

  return (
    <div className={classes.contactsContainer}>
      <Invitation />
      <ul className={classes.contactList}>
        {userState.user.contacts.map((contact) => {
          return <Contact contact={contact} key={contact.email} />;
        })}
      </ul>
    </div>
  );
};

Contacts.propTypes = {};

export default Contacts;
