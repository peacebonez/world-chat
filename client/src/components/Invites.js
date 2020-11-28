import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import InviteIn from './InviteIn';
import InviteOut from './InviteOut';
import { UserContext } from '../contexts/userContext';

import { makeStyles } from '@material-ui/core/styles';
import AppAlert from './AppAlert';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    overflowX: 'hidden',
    direction: 'ltr',
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
    width: '90%',
  },
  inviteUl: {
    paddingLeft: 0,
  },
}));

const Invites = () => {
  const { userState, userActions } = useContext(UserContext);
  const classes = useStyles();

  const [showRequests, setShowRequests] = useState(true);
  const [showSent, setShowSent] = useState(false);
  const [invites, setInvites] = useState(null);

  const requestsShow = () => {
    setShowRequests(true);
    setShowSent(false);
  };
  const sentShow = () => {
    setShowSent(true);
    setShowRequests(false);
  };

  const handleApproveOrReject = async (invite, type) => {
    try {
      await axios.put(`/invitation/${invite._id}/${type}`);
      const invitesCopy = { ...invites };
      invitesCopy.pendingInvitesIn.splice(invite.index, 1);
      setInvites(invitesCopy);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    //fetch all the PENDING invites user has sent and received on load
    (async function fetchInvites() {
      const fetchedInvites = await userActions.fetchPendingInvites();
      setInvites(fetchedInvites);
    })();
  }, []);

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
              invites.pendingInvitesIn.length > 0 &&
              invites.pendingInvitesIn.map((invite, index) => {
                invite.index = index;
                return (
                  <InviteIn
                    key={invite._id}
                    invite={invite}
                    invitesIn={invites.pendingInvitesIn}
                    handleApproveOrReject={handleApproveOrReject}
                  />
                );
              })}
          </ul>
        )}
        {/* display all pending invites sent BY user */}
        {showSent && (
          <ul className={classes.inviteUl}>
            {invites &&
              invites.pendingInvitesOut.length > 0 &&
              invites.pendingInvitesOut.map((invite) => (
                <InviteOut key={invite._id} invite={invite} />
              ))}
          </ul>
        )}
      </div>
      {/* Error alerts */}
      <AppAlert trigger={userState.errorMsg} />
    </div>
  );
};

export default Invites;
