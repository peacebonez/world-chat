import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatRoom from './ChatRoom';
import AppAlert from './AppAlert';
import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  chatListContainer: {},
  chatList: {},
}));

const ChatList = () => {
  const { userState, userActions, socket } = useContext(UserContext);
  console.log('userState:', userState);
  const classes = useStyles();

  const [activeIndex, setActiveIndex] = useState(null);

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
          createdOn: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdOn: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdOn: '11/28/2020',
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
          createdOn: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdOn: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdOn: '11/28/2020',
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
          createdOn: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdOn: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdOn: '11/28/2020',
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
          createdOn: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdOn: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdOn: '11/28/2020',
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
          createdOn: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdOn: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdOn: '11/28/2020',
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
          createdOn: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdOn: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdOn: '11/28/2020',
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
          createdOn: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mary',
          originalLanguage: 'English',
          text: 'Howdy',
          createdOn: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'How are you?',
          createdOn: '11/28/2020',
          isRead: false,
        },
      ],
    },
  ];

  const handleFetch = async () => await userActions.fetchConversations();

  // const [isActive, setIsActive] = useState(false);

  const handleActive = (index, chatRoom) => {
    if (activeIndex) testChats[activeIndex].isActive = false;
    setActiveIndex(index);
    // testChats.forEach((chat) => (chat.isActive = false));
    chatRoom.isActive = true;
    userActions.switchConversation(chatRoom);
    console.log('chatRoom:', chatRoom);
  };

  useEffect(() => {
    //Fetch all user conversations on load
    handleFetch();
  }, []);

  return (
    <div className={classes.chatListContainer}>
      <ul className={classes.chatList}>
        {testChats.map((chat, index) => {
          return (
            <ChatRoom
              chatRoom={chat}
              index={index}
              handleActive={handleActive}
              activeIndex={activeIndex}
            />
          );
        })}
      </ul>
      <AppAlert trigger={userState.errorMsg} />
    </div>
  );
};

export default ChatList;
