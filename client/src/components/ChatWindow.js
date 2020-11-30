import React, { useState, useEffect, useContext } from 'react';
import ChatInput from './ChatInput';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../contexts/userContext';

require('dotenv').config();
const useStyles = makeStyles((theme) => ({
  chatWindow: {
    width: '100%',
    height: '85vh',
    background: '#fff',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  msgAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
}));

const ChatWindow = () => {
  const classes = useStyles();
  const { socket, userState } = useContext(UserContext);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join', '123'); // replace 123 with conversation id
    });

    socket.on('roomJoined', (room) => {
      console.log('successfully joined', room);
    });

    socket.on('messageFromServer', (data) => {
      console.log('new message coming in', data);
      // setChat((prevChat) => [...prevChat, data]);
    });
  }, []);

  useEffect(() => {
    if (userState.user.activeRoom) setRoom(userState.user.activeRoom);
  }, [userState.user]);

  return (
    <div className={classes.chatWindow}>
      <ul>
        {room &&
          room.messages.length > 0 &&
          room.messages.map((msg) => {
            const indexOfSender = room.members.findIndex(
              (member) => member._id === msg.fromUser,
            );

            return (
              <li key={msg.createdOn}>
                <img
                  src={room.members[indexOfSender].avatar}
                  className={classes.msgAvatar}
                />
                <div>
                  {msg.text} by {msg.fromUser} on {msg.createdOn}
                </div>
              </li>
            );
          })}
      </ul>
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
