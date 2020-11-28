import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import tempAvatar from '../assets/temp-avatar.jpg';
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
  textWrapper: {
    flexDirection: 'column',
  },
  statusIcon: {
    width: 12,
    height: 12,
    border: 'solid white 1px',
    borderRadius: '50%',
  },
  msgNotification: {
    width: 30,
    height: 30,
    background: theme.palette.primary.blue,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(400%,30%)',
  },
  onlineIcon: { background: '#4DED84' },
  offlineIcon: { background: 'lightgray' },
}));

// const testChats = [
//     {
//       chatters: {
//         user: { name: 'Mary', avatar: 'string' },
//       },
//       messages: [
//         {
//           fromUser: userState.user.name,
//           originalLanguage: 'English',
//           text: 'Hey There!',
//           createdAt: '11/28/2020',
//         },
//         {
//           fromUser: 'Mary',
//           originalLanguage: 'English',
//           text: 'Howdy',
//           createdAt: '11/28/2020',
//         },
//         {
//           fromUser: userState.user.name,
//           originalLanguage: 'English',
//           text: 'How are you?',
//           createdAt: '11/28/2020',
//         },
//       ],
//     },
//   ];

const ChatRoom = ({ chatRoom, i }) => {
  console.log('chatRoom:', chatRoom);
  //test isOnline hard code
  let isOnline = 'true';
  const classes = useStyles();
  return (
    <div className={classes.contactWrapper}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img
            src={
              chatRoom.chatters.user.avatar
                ? chatRoom.chatters.user.avatar
                : tempAvatar
            }
            alt="user avatar"
            className={classes.sideBarImg}
          />
          <span
            className={`${classes.statusIcon} ${
              isOnline ? classes.onlineIcon : classes.offlineIcon
            }`}
          ></span>
        </div>
        <div className={classes.textWrapper}>
          <Typography variant="h6">{chatRoom.chatters.user.name}</Typography>
          <Typography variant="subtitle1">
            {chatRoom.messages[chatRoom.messages.length - 1].text}
          </Typography>
        </div>
        <span className={classes.msgNotification}>7</span>
      </div>
    </div>
  );
};

export default ChatRoom;
