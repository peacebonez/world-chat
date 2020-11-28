import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatRoom from './ChatRoom';

import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  chatListContainer: {},
  chatList: {},
}));

const ChatList = () => {
  const { userState, userActions } = useContext(UserContext);
  const classes = useStyles();

  const testChats = [
    {
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
        },
      ],
    },
    {
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
        },
      ],
    },
    {
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
        },
      ],
    },
    {
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
        },
      ],
    },
    {
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
        },
      ],
    },
    {
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
        },
      ],
    },
    {
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
        },
      ],
    },
  ];

  const handleFetch = async () => await userActions.fetchConversations();

  useEffect(() => {
    //Fetch all user conversations on load
    handleFetch();
  }, []);

  return (
    <div className={classes.chatListContainer}>
      <ul className={classes.chatList}>
        {testChats.map((chat, i) => {
          return <ChatRoom chatRoom={chat} index={i} />;
        })}
      </ul>
    </div>
  );
};

export default ChatList;
