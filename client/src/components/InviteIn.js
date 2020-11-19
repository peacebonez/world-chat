import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

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

const InviteIn = ({ invite, invitesIn, setInvitesIn }) => {
  const { avatar, name } = invite;
  const classes = useStyles();

  const handleApprove = () => {
    //remove invite from invitesIn
    //change status to approved
    //add to contacts

    invite.status = 'approved';
    let invitesInCopy = [...invitesIn];

    let filteredInvites = invitesInCopy.filter((request) => {
      return request.email !== invite.email;
    });
    console.log('invite:', invite);
    setInvitesIn(filteredInvites);
  };
  const handleReject = () => {
    //remove invite from invitesIn
    invite.status = 'rejected';
    let invitesInCopy = [...invitesIn];

    let filteredInvites = invitesInCopy.filter((request) => {
      return request.email !== invite.email;
    });
    console.log('invite:', invite);
    setInvitesIn(filteredInvites);
  };
  return (
    <li className={classes.inviteItem}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img src={avatar} alt="user avatar" className={classes.sideBarImg} />
        </div>
        <Typography variant="h6">{name}</Typography>
      </div>
      <div>
        <button className={classes.button} onClick={handleApprove}>
          <CheckIcon className={`${classes.icon} ${classes.check}`} />
        </button>
        <button className={classes.button} onClick={handleReject}>
          <ClearIcon className={`${classes.icon} ${classes.cross}`} />
        </button>
      </div>
    </li>
  );
};

InviteIn.propTypes = {};

export default InviteIn;
