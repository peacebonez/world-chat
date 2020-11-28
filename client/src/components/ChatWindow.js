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
}));

const ChatWindow = () => {
  const classes = useStyles();
  const { socket, userState } = useContext(UserContext);
  console.log('socket:', socket);
  const [chat, setChat] = useState(null); // current conversation object

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join', '123'); // replace 123 with conversation id
    });

    socket.on('roomJoined', (room) => {
      console.log('successfully joined', room);
    });

    socket.on('messageFromServer', (data) => {
      console.log('new message coming in', data);
      setChat((prevChat) => [...prevChat, data]);
    });
  }, []);

  return (
    <div className={classes.chatWindow}>
      <ul>
        {chat &&
          chat.messages.map((datum) => (
            <li key={datum.createdAt}>
              {datum.text} by {datum.fromUser} on {datum.createdAt}
            </li>
          ))}
      </ul>
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
