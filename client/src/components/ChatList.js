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
  console.log('userState:', userState);
  const classes = useStyles();

  const testChats = [
    {
      _id: '87263612836872387sddp',
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
          isRead: false,
        },
      ],
    },
    {
      _id: '87263612836872387sddq',
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
          isRead: false,
        },
      ],
    },
    {
      _id: '87263612836872387sddr',
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
          isRead: false,
        },
      ],
    },
    {
      _id: '87263612836872387sdde',
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
          isRead: false,
        },
      ],
    },
    {
      _id: '87263612836872387sddd',
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
          isRead: false,
        },
      ],
    },
    {
      _id: '87263612836872387sddc',
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
          isRead: false,
        },
      ],
    },
    {
      _id: '87263612836872387sddb',
      chatters: {
        user: { name: 'Mary', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'Hey There!',
          createdAt: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdAt: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdAt: '11/28/2020',
          isRead: false,
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
