import React, { useState, useEffect, useContext, useRef } from 'react';
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
  sectionChat: {
    width: '100%',
    display: 'inlineBlock',
    overflow: 'auto',
  },
  chatUnit: {
    float: 'left',
    marginBottom: '1rem',
    width: '50%',
  },
  chatUnitYours: {
    float: 'right',
    marginBottom: '1rem',
    width: '50%',
    marginRight: theme.spacing(2),
  },
  bubble: {
    background:
      'linear-gradient(0deg, rgba(26,114,183,1) 0%, rgba(14,172,117,1) 100%)',
    maxWidth: '18rem',
    wordWrap: 'break-word',
    borderRadius: '0px 15px 15px 15px',
    display: 'inline-block',
    float: 'left',
  },
  bubbleYours: {
    background:
      'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
    maxWidth: '18rem',
    wordWrap: 'break-word',
    borderRadius: '15px 15px 0px 15px',
    display: 'inline-block',
    float: 'right',
  },
  textInBubble: {
    color: 'white',
    padding: '10px 10px 10px 10px',
  },
}));

const ChatWindow = () => {
  const classes = useStyles();
  const { socket, userState } = useContext(UserContext);
  const [chat, setChat] = useState([]); // an array of "data's"

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
      <div className={classes.sectionChat}>
        {chat.map((datum, index) => {
          console.log(datum);
          let yours = datum.email === userState.user.email;
          return (
            <section
              key={index}
              className={yours ? classes.chatUnitYours : classes.chatUnit}
            >
              <Typography variant="subtitle2">
                {yours ? '' : datum.moreData.userName} {datum.createdOn.hour}:
                {datum.createdOn.minute < 10 ? `0${datum.createdOn.minute}` : datum.createdOn.minute}
              </Typography>
              <ChatBubble message={datum.message} yours={yours} />
            </section>
          );
        })}
      </div>
      <ChatInput />
    </div>
  );
};

const ChatBubble = (props) => {
  const classes = useStyles();

  return (
    <section className={props.yours ? classes.bubbleYours : classes.bubble}>
      <Typography variant="subtitle1" className={classes.textInBubble}>
        {props.message}
      </Typography>
    </section>
  );
};

export default ChatWindow;
