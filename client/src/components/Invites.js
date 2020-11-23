import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import axios from 'axios';

import InviteIn from './InviteIn';
import InviteOut from './InviteOut';

import { makeStyles } from '@material-ui/core/styles';

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

const Invites = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const { userState } = useContext(UserContext);
  console.log('userState:', userState);

  const [showRequests, setShowRequests] = useState(true);
  const [showSent, setShowSent] = useState(false);
  const [invites, setInvites] = useState(null);
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
    console.log('invite:', invite);
    try {
      const res = await axios.put(`/invitation/${invite._id}/approve`);
      return res;
    } catch (err) {
      console.log(err.message);
    }

    // invites.pendingInvitesIn.splice(invite.index, 1);
  };
  const handleRejectRequest = async (invite) => {
    console.log('invite:', invite);
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
          const pendingInvites = res.data;

          //sets invites to an object of pending in and out invites
          return setInvites(pendingInvites);
        }
        if (res.status === 404 || res.status === 500) {
          //user not found
          //dispatch user error
          history.push('/');
        }
      } catch (err) {
        console.log(err.message);
        //server error
        //dispatch user error
        // history.push('/');
      }
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
              invites.pendingInvitesIn.map((invite, index) => {
                invite.index = index;
                return (
                  <InviteIn
                    key={invite.referrer}
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

//will actually load userState.user.email
const testReferrer = {
  email: 'test@aol.com',
};
const testInvitesIn = [
  {
    referrer: testReferrer.email,
    toEmail: 'friend0@aol.com',
    name: 'friend0',
    status: 'pending',
    createdAt: '11/11/2020',
  },
  {
    referrer: testReferrer.email,
    toEmail: 'friend1@aol.com',
    name: 'friend1',
    status: 'pending',
    createdAt: '11/11/2020',
  },
  {
    referrer: testReferrer.email,
    toEmail: 'friend2@aol.com',
    name: 'friend2',
    status: 'pending',
    createdAt: '11/11/2020',
  },
  {
    referrer: testReferrer.email,
    toEmail: 'friend3@aol.com',
    name: 'friend3',
    status: 'pending',
    createdAt: '11/11/2020',
  },
  {
    referrer: testReferrer.email,
    toEmail: 'friend4@aol.com',
    name: 'friend4',
    status: 'pending',
    createdAt: '11/11/2020',
  },
  {
    referrer: testReferrer.email,
    toEmail: 'friend5@aol.com',
    name: 'friend5',
    status: 'pending',
    createdAt: '11/11/2020',
  },
  {
    referrer: testReferrer.email,
    toEmail: 'friend6@aol.com',
    name: 'friend6',
    status: 'pending',
    createdAt: '11/11/2020',
  },
  {
    referrer: testReferrer.email,
    toEmail: 'friend7@aol.com',
    name: 'friend7',
    status: 'pending',
    createdAt: '11/11/2020',
  },
  {
    referrer: testReferrer.email,
    toEmail: 'friend8@aol.com',
    name: 'friend8',
    status: 'pending',
    createdAt: '11/11/2020',
  },
  {
    referrer: testReferrer.email,
    toEmail: 'friend9@aol.com',
    name: 'friend9',
    status: 'pending',
    createdAt: '11/11/2020',
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
