import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import InviteIn from './InviteIn';
import InviteOut from './InviteOut';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inviteSelector: {
    border: 'none',
    outline: 'none',
    background: 'none',
    color: '#4097E8',
    fontSize: 20,
    fontWeight: 700,
    cursor: 'pointer',
  },
  invitesWrapper: {
    width: '100%',
  },
  inviteUl: {
    paddingLeft: 0,
  },
}));

const testInvites = [];

const Invites = (props) => {
  const [showRequests, setShowRequests] = useState(true);
  const [showSent, setShowSent] = useState(false);
  const classes = useStyles();

  const requestShow = () => {
    setShowRequests(true);
    setShowSent(false);
  };
  const sentShow = () => {
    setShowSent(true);
    setShowRequests(false);
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <button className={classes.inviteSelector} onClick={requestShow}>
          Requests
        </button>
        <button className={classes.inviteSelector} onClick={sentShow}>
          Sent
        </button>
      </div>
      <div className={classes.invitesWrapper}>
        {showRequests && <ul className={classes.inviteUl}>'REQUESTS!'</ul>}
        {showSent && <ul className={classes.inviteUl}>'SENT!'</ul>}
      </div>
    </div>
  );
};

Invites.propTypes = {};

export default Invites;
