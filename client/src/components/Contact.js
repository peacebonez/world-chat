import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import tempAvatar from '../assets/temp-avatar.jpg';
import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  contactWrapper: {
    height: 100,
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
    height: '70px',
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
  console.log('contact:', contact);
  //test isOnline hard code
  let isOnline = 'true';
  const classes = useStyles();
  const { userActions, userState, socket } = useContext(UserContext);

  const handleClickContact = async () => {
    //if in mobile mode screen shifts to chat
    userActions.appChatView();
    const userAvatar = userState.user.avatar.url || tempAvatar;
    const contactAvatar = contact.avatar ? contact.avatar.url : tempAvatar;
    const members = [
      {
        _id: userState.user.id,
        name: userState.user.name,
        avatar: userAvatar,
      },
      {
        _id: contact.id,
        name: contact.name,
        email: contact.email,
        primaryLanguage: contact.primaryLanguage,
        avatar: contactAvatar,
      },
    ];

    //check if converstation exists between user and contact
    const existingConversation = await userActions.fetchSingleConversation(
      members,
    );

    //if no conversation exists, create a new conversation and set it as active
    if (!existingConversation) {
      const newConversation = await userActions.addConversation(members);
      userActions.switchConversation(newConversation);
      return socket.emit('join', newConversation._id);
    }
    //if conversation already exists, fetch that conversation and set it as active
    userActions.switchConversation(existingConversation);
    return socket.emit('join', existingConversation._id);
  };

  return (
    <li className={classes.contactWrapper} onClick={handleClickContact}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img
            src={contact.avatar ? contact.avatar.url : tempAvatar}
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
