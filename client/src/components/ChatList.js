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

  const handleActive = async (index, chatRoom) => {
    setActiveIndex(index);
    userActions.switchConversation(chatRoom);
    userActions.appChatView();
    socket.emit('join', chatRoom._id);
    userActions.messagesRead(chatRoom._id);
  };

  //Fetch all user conversations on load
  useEffect(() => {
    userActions.fetchConversations();
  }, []);

  //Load up an active chat. TODO- load chat with most recent message
  useEffect(() => {
    if (userState.user.conversations) {
      userActions.switchConversation(userState.user.conversations[0]);
    }
  }, [userState.user.conversations]);
  return (
    <div className={classes.chatListContainer}>
      <ul className={classes.chatList}>
        {userState.user.conversations &&
          userState.user.conversations.length > 0 &&
          userState.user.conversations.map((chatRoom, index) => {
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
