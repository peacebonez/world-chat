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
  const classes = useStyles();

  const [activeIndex, setActiveIndex] = useState(null);
  const [chats, setChats] = useState(null);

  const handleFetch = async () => await userActions.fetchConversations();

  const handleActive = async (index, chatRoom) => {
    setActiveIndex(index);
    userActions.switchConversation(chatRoom);
    userActions.appChatView();
    socket.emit('join', chatRoom._id);
    await userActions.messagesRead(chatRoom._id);
  };

  useEffect(() => {
    //Fetch all user conversations on load

    handleFetch();
    setChats(userState.user.conversations);

    //on load set active chat as most recent chat
    if (chats) userActions.switchConversation(chats[chats[chats.length - 1]]);
  }, []);
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
