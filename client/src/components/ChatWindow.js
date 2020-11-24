import React, { useState, useEffect, useContext } from 'react';
import ChatInput from './ChatInput';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../contexts/userContext';
import { Typography } from '@material-ui/core';

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
  bubble: {
    background: 'linear-gradient(0deg, rgba(26,114,183,1) 0%, rgba(14,172,117,1) 100%)',
    maxWidth: '18rem',
    wordWrap: 'break-word'
  },
  textInBubble: {
    color: 'white',
    padding: '1em 1em 1em 1em'
  }
}));

const ChatWindow = () => {
  const classes = useStyles();
  console.log(useContext(UserContext));
  const { socket, userState } = useContext(UserContext);
  const [chat, setChat] = useState([]); // an array of "data's"

  const name = userState.user.name;
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join', '123' ); // replace 123 with conversation id
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
        {chat.map((datum, index) => (
          <section key={index}>
            <Typography variant="subtitle2">{name} {datum.createdOn.hour}:{datum.createdOn.minute}</Typography>
            <ChatBubble message={datum.message} />
          </section>
          // <li key={datum.createdOn}>
          //   {datum.message} by {datum.email} on {datum.createdOn}
          // </li>
        ))}
      </ul>
      <ChatInput />
    </div>
  );
};

const ChatBubble = (props) => {
  const classes = useStyles();

  return (
    <section className={classes.bubble}>
      <Typography variant="subtitle1" className={classes.textInBubble}>{props.message}</Typography>
    </section>
  )
}

export default ChatWindow;
