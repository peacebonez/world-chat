import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

import tempAvatar from '../assets/temp-avatar.jpg';

const useStyles = makeStyles((theme) => ({
  inviteItem: {
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
  sideBarImg: {
    borderRadius: '100%',
    overflow: 'hidden',
    width: '40px',
    height: '40px',
    marginRight: theme.spacing(1),
  },
  button: {
    background: 'none',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  icon: {
    fontSize: 30,
  },
  check: {
    color: theme.palette.primary.blue,
    '&:hover': {
      color: theme.palette.secondary.green,
    },
  },
  cross: {
    '&:hover': {
      color: 'red',
    },
  },
}));

const InviteIn = ({ invite, handleApproveOrReject }) => {
  console.log('invite:', invite);
  const classes = useStyles();

  return (
    <li className={classes.inviteItem}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img
            src={invite.avatar ? invite.avatar : tempAvatar}
            alt="user avatar"
            className={classes.sideBarImg}
          />
        </div>
        <Typography variant="body1">{invite.referrerEmail}</Typography>
      </div>
      <div>
        <button
          className={classes.button}
          onClick={() => handleApproveOrReject(invite, 'approve')}
        >
          <CheckIcon className={`${classes.icon} ${classes.check}`} />
        </button>
        <button
          className={classes.button}
          onClick={() => handleApproveOrReject(invite, 'reject')}
        >
          <ClearIcon className={`${classes.icon} ${classes.cross}`} />
        </button>
      </div>
    </li>
  );
};

InviteIn.propTypes = {
  invite: PropTypes.object.isRequired,
  handleApproveOrReject: PropTypes.func.isRequired,
};

export default InviteIn;
