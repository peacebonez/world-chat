import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import happyChatter from '../assets/happy-chatter.png';
import PropTypes from 'prop-types';
import tempAvatar from '../assets/temp-avatar.jpg';

const useStyles = makeStyles((theme) => ({
  sideBarHeader: {
    height: 100,
    width: '85%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 'solid 1px #ddd',
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
  //test hard code
  let isOnline = 'true';
  console.log('contact:', contact);
  const classes = useStyles();
  return (
    <li className={classes.sideBarHeader}>
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

Contact.propTypes = {};

export default Contact;
