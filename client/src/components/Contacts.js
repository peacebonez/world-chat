import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Contact from './Contact';
import Invitation from './Invitation';
import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  contactsContainer: {
    width: '100%',
  },
  contactList: {
    listStyle: 'none',
  },
}));

const Contacts = ({searchText}) => {
  const { userState } = useContext(UserContext);

  const classes = useStyles();

  return (
    <div className={classes.contactsContainer}>
      <Invitation />
      <ul className={classes.contactList}>
        {userState.user.contacts.reduce((filteredResult, contact) => {
          //return <Contact contact={contact} key={contact.email} />;
          // to lower case: we want to ignore capitalization in search
          if (contact.name.toLowerCase().includes(searchText.toLowerCase())) { 
            filteredResult.push(
              <Contact contact={contact} key={contact.email} />
            );
          }
          return filteredResult;
        }, [])}
      </ul>
    </div>
  );
};

export default Contacts;
