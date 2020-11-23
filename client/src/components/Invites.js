import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import axios from 'axios';

import InviteIn from './InviteIn';
import InviteOut from './InviteOut';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    overflowX: 'hidden',
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
  inviteSelectorActive: {
    fontSize: 28,
  },
  invitesWrapper: {
    width: '100%',
  },
  inviteUl: {
    paddingLeft: 0,
  },
}));

const Invites = () => {
  const classes = useStyles();
  const { userState } = useContext(UserContext);

  const [showRequests, setShowRequests] = useState(true);
  const [showSent, setShowSent] = useState(false);
  const [invites, setInvites] = useState(null);
  const [invitesError, setInvitesError] = useState(false);
  const [invitesErrorMsg, setInvitesErrorMsg] = useState('');
  console.log('invites:', invites);

  const requestsShow = () => {
    setShowRequests(true);
    setShowSent(false);
  };
  const sentShow = () => {
    setShowSent(true);
    setShowRequests(false);
  };

  //both of these will need to make API calls to save modified state
  const handleApproveRequest = async (invite) => {
    try {
      const res = await axios.put(`/invitation/${invite._id}/approve`);
      return res;
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleRejectRequest = async (invite) => {
    try {
      const res = await axios.put(`/invitation/${invite._id}/reject`);
      return res;
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    //axios fetch all the PENDING invites user has sent and received
    //is called whenever a change in invitations takes place
    (async function fetchPendingInvites() {
      try {
        const res = await axios.get(
          `user/${userState.user.id}/invitations/pending`,
        );

        //if response is ok or user has no invites
        if (res.status === 200 || res.status === 204) {
          //sets invites to an object of pending in and out invites
          const pendingInvites = res.data;
          return setInvites(pendingInvites);
        }
        if (res.status === 404 || res.status === 500) {
          //user not found
          //dispatch user error
          setInvitesErrorMsg('Error fetching invites');
          setInvites(true);
        }
      } catch (err) {
        console.log(err.message);
        setInvitesErrorMsg('Error fetching invites');
        setInvites(true);
        //server error
        //dispatch user error
      }
    })();
  }, [invites]);

  //clears the backend error alert msg
  useEffect(() => {
    let timer;
    if (invitesError) {
      timer = setTimeout(() => {
        setInvitesError(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  });

  return (
    <div className={classes.wrapper}>
      <div>
        <button
          className={`${classes.inviteSelector} ${
            showRequests && classes.inviteSelectorActive
          }`}
          onClick={requestsShow}
        >
          Requests
        </button>
        <button
          className={`${classes.inviteSelector} ${
            showSent && classes.inviteSelectorActive
          }`}
          onClick={sentShow}
        >
          Sent
        </button>
      </div>
      <div className={classes.invitesWrapper}>
        {/* display all pending invites sent TO user */}
        {showRequests && (
          <ul className={classes.inviteUl}>
            {invites &&
              invites.pendingInvitesIn.map((invite, index) => {
                invite.index = index;
                return (
                  <InviteIn
                    key={invite._id}
                    invite={invite}
                    invitesIn={invites.pendingInvitesIn}
                    handleApproveRequest={handleApproveRequest}
                    handleRejectRequest={handleRejectRequest}
                  />
                );
              })}
          </ul>
        )}
        {/* display all pending invites sent BY user */}
        {showSent && (
          <ul className={classes.inviteUl}>
            {invites &&
              invites.pendingInvitesOut.map((invite) => (
                <InviteOut key={invite._id} invite={invite} />
              ))}
          </ul>
        )}
      </div>
      {/* Error alerts */}
      <Snackbar
        open={invitesError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          {invitesErrorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Invites;
