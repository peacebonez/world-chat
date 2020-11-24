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

const ChatWindow = (props) => {
  const classes = useStyles();
  const { socket } = useContext(UserContext);
  const [chat, setChat] = useState([]); // an array of "data's"

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join', 123 ); // replace 123 with conversation id
    });

    socket.on('roomJoined', (room) => {
      console.log('successfull joined', room);
    });

    socket.on('messageFromServer', (data) => {
      console.log('new message coming in', data);
      setChat((prevChat) => [...prevChat, data]);
    });
  }, []);

  return (
    <div className={classes.chatWindow}>
      chat window!
      <ul>
        {chat.map((datum) => (

          <li key={datum.createdOn}>
            {datum.message} by {datum.email} on {datum.createdOn}
          </li>
        ))}
      </ul>
      <ChatInput />
    </div>
  );
};

ChatWindow.propTypes = {};

export default ChatWindow;
