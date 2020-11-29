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
  const [chats, setChats] = useState(null);

  const testChats = [
    {
      _id: '87263612836872387sddp',
      members: {
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
      members: {
        user: { name: 'Sonny', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'SUP!',
          createdOn: '11/29/2020',
          isRead: true,
        },
        {
          fromUser: 'Sonny',
          originalLanguage: 'English',
          text: 'Do you have COVID yet?',
          createdOn: '11/29/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'I dont think so',
          createdOn: '11/29/2020',
          isRead: false,
        },
      ],
    },
    {
      _id: '87263612836872387sddr',
      members: {
        user: { name: 'Mo', avatar: 'string' },
      },
      messages: [
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'You up?',
          createdOn: '11/28/2020',
          isRead: true,
        },
        {
          fromUser: 'Mo',
          originalLanguage: 'English',
          text: 'wyd',
          createdOn: '11/28/2020',
          isRead: false,
        },
        {
          fromUser: userState.user.name,
          originalLanguage: 'English',
          text: 'I dunno, wbu',
          createdOn: '11/28/2020',
          isRead: false,
        },
      ],
    },
  ];

  const handleFetch = async () => await userActions.fetchConversations();

  const handleActive = async (index, chatRoom) => {
    setActiveIndex(index);
    await userActions.messagesRead(chatRoom._id);
    userActions.switchConversation(chatRoom);
  };

  useEffect(() => {
    //Fetch all user conversations on load

    handleFetch();
    setChats(userState.user.conversations);

    //on load set active chat as most recent chat
    if (chats) userActions.switchConversation(chats[0]);
  }, [userState.user.conversations]);
  console.log('chats:', chats);
  return (
    <div className={classes.chatListContainer}>
      <ul className={classes.chatList}>
        {chats &&
          chats.map((chatRoom, index) => {
            return (
              <ChatRoom
                chatRoom={chatRoom}
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
