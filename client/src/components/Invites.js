import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import tempAvatar from '../assets/temp-avatar.jpg';

import InviteIn from './InviteIn';
import InviteOut from './InviteOut';

import { makeStyles } from '@material-ui/core/styles';

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

const testInvitesIn = [
  {
    avatar: tempAvatar,
    email: 'friend0@aol.com',
    name: 'friend0',
    status: 'pending',
  },
  {
    avatar: tempAvatar,
    email: 'friend1@aol.com',
    name: 'friend1',
    status: 'pending',
  },
  {
    avatar: tempAvatar,
    email: 'friend2@aol.com',
    name: 'friend2',
    status: 'pending',
  },
  {
    avatar: tempAvatar,
    email: 'friend3@aol.com',
    name: 'friend3',
    status: 'pending',
  },
  {
    avatar: tempAvatar,
    email: 'friend4@aol.com',
    name: 'friend4',
    status: 'pending',
  },
  {
    avatar: tempAvatar,
    email: 'friend5@aol.com',
    name: 'friend5',
    status: 'pending',
  },
  {
    avatar: tempAvatar,
    email: 'friend6@aol.com',
    name: 'friend6',
    status: 'pending',
  },
  {
    avatar: tempAvatar,
    email: 'friend7@aol.com',
    name: 'friend7',
    status: 'pending',
  },
  {
    avatar: tempAvatar,
    email: 'friend8@aol.com',
    name: 'friend8',
    status: 'pending',
  },
  {
    avatar: tempAvatar,
    email: 'friend9@aol.com',
    name: 'friend9',
    status: 'pending',
  },
];
const testInvitesOut = [
  'friend6@aol.com',
  'friend7@aol.com',
  'friend8@aol.com',
  'friend9@aol.com',
  'friend10@aol.com',
  'friend11@aol.com',
];

const Invites = (props) => {
  const [showRequests, setShowRequests] = useState(true);
  const [showSent, setShowSent] = useState(false);
  const [invitesIn, setInvitesIn] = useState(testInvitesIn);
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
        {/* display all pending invites sent TO user */}
        {showRequests && (
          <ul className={classes.inviteUl}>
            {invitesIn.map((invite) => (
              <InviteIn
                key={invite.email}
                invite={invite}
                invitesIn={invitesIn}
                setInvitesIn={setInvitesIn}
              />
            ))}
          </ul>
        )}
        {/* display all pending invites sent BY user */}
        {showSent && (
          <ul className={classes.inviteUl}>
            {testInvitesOut.map((invite) => (
              <InviteOut key={invite} invite={invite} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Invites.propTypes = {};

export default Invites;
