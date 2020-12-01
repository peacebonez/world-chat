import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import tempAvatar from '../assets/temp-avatar.jpg';

import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  contactWrapper: {
    height: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 'solid 1px #ddd',
    cursor: 'pointer',
    direction: 'ltr',
    '& div': {
      display: 'flex',
    },
  },
  sideBarImg: {
    borderRadius: '100%',
    overflow: 'hidden',
    width: '70px',
    height: '70px',
    marginRight: theme.spacing(1),
  },
  textWrapper: {
    flexDirection: 'column',
  },
  statusIcon: {
    width: 12,
    height: 12,
    border: 'solid white 1px',
    borderRadius: '50%',
    position: 'relative',
    transform: 'translate(-200%,380%)',
  },
  msgPreview: {
    color: 'gray',
    width: '150px',
  },
  unreadMsg: {
    color: '#000',
    fontWeight: 'bold',
  },
  msgNotification: {
    width: 30,
    height: 30,
    background: theme.palette.primary.blue,
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(400%,30%)',
  },
  onlineIcon: { background: '#4DED84' },
  offlineIcon: { background: 'lightgray' },
  chatActive: { background: theme.palette.secondary.main },
}));

const ChatRoom = ({ chatRoom, index, handleActive, activeIndex }) => {
  console.log('chatRoom:', chatRoom);
  //test isOnline hard code
  let isOnline = 'true';
  const classes = useStyles();
  const { userState, userActions } = useContext(UserContext);

  const numUnreadMsgs = () => {
    return chatRoom.messages.filter(
      (msg) => msg.isRead === false && msg.fromUser !== userState.user.email,
    ).length;
  };

  const chatMembersExcludingUser = chatRoom.members.filter((member) => {
    return member._id !== userState.user.id;
  });

  const truncateMsgPreview = (text, limit) => {
    if (!text) return '';
    if (text.length > limit) return text.substr(0, limit) + '...';
    return text;
  };

  return (
    <div
      className={`${classes.contactWrapper} ${
        activeIndex === index ? classes.chatActive : ''
      }`}
      onClick={() => {
        handleActive(index, chatRoom);
        userActions.appChatView();
      }}
    >
      <div>
        <div className={classes.sideBarImgWrapper}>
          {chatMembersExcludingUser.map((member) => (
            <>
              <img
                key={member._id}
                src={member.avatar ? member.avatar : tempAvatar}
                alt="user avatar"
                className={classes.sideBarImg}
              />
              <span
                className={`${classes.statusIcon} ${
                  isOnline ? classes.onlineIcon : classes.offlineIcon
                }`}
              ></span>
            </>
          ))}
        </div>
        <div className={classes.textWrapper}>
          {chatMembersExcludingUser.map((member) => (
            <Typography variant="h6" key={member._id}>
              {member.name}
            </Typography>
          ))}
          <Typography
            variant="subtitle1"
            className={`${classes.msgPreview} ${
              numUnreadMsgs() > 0 &&
              chatRoom.messages[chatRoom.messages.length - 1].fromUser !==
                userState.user.email
                ? classes.unreadMsg
                : ''
            }`}
          >
            {chatRoom.messages.length
              ? truncateMsgPreview(
                  chatRoom.messages[chatRoom.messages.length - 1].text,
                  20,
                )
              : ''}
          </Typography>
        </div>
        {numUnreadMsgs() > 0 && (
          <span className={classes.msgNotification}>{numUnreadMsgs()}</span>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
