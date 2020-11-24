import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Contact from './Contact';
import Invitation from './Invitation';
import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  contactsContainer: {
    width: '80%',
  },
  contactList: {
    paddingLeft: 0,
  },
}));

const Contacts = () => {
  const { userState } = useContext(UserContext);

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

export default Contacts;
