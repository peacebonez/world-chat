import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import tempAvatar from '../assets/temp-avatar.jpg';
import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  contactWrapper: {
    height: 100,
    width: '95%',
    display: 'flex',
    borderBottom: 'solid 1px #ddd',
    cursor: 'pointer',
    direction: 'ltr',
    '& div': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sideBarImgWrapper: {
    '& span': {
      position: 'relative',
      transform: 'translate(-200%,180%)',
    },
  },
  sideBarImg: {
    borderRadius: '100%',
    overflow: 'hidden',
    width: '70px',
    marginRight: theme.spacing(1),
  },
  statusIcon: {
    width: 12,
    height: 12,
    border: 'solid white 1px',
    borderRadius: '50%',
  },
  onlineIcon: { background: '#4DED84' },
  offlineIcon: { background: 'lightgray' },
}));

const Contact = ({ contact }) => {
  //test isOnline hard code
  let isOnline = 'true';
  const classes = useStyles();
  const { userActions, userState } = useContext(UserContext);
  console.log('userState:', userState);

  const handleCreateChat = async () => {
    const members = [
      {
        _id: userState.user.id,
        name: userState.user.name,
        avatar: userState.user.avatar.url,
      },
      { _id: contact._id, name: contact.name, avatar: contact.avatar },
    ];
    userActions.addConversation(members);
    //set newly created conversation as active conversation
  };

  return (
    <li className={classes.contactWrapper}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img
            src={contact.avatar ? contact.avatar : tempAvatar}
            alt="user avatar"
            className={classes.sideBarImg}
          />
          <span
            className={`${classes.statusIcon} ${
              isOnline ? classes.onlineIcon : classes.offlineIcon
            }`}
          ></span>
        </div>
        <Typography variant="h5">{contact.name}</Typography>
      </div>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;
