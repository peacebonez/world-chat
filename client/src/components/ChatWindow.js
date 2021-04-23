import React, { useState, useEffect, useContext } from 'react';
import ChatInput from './ChatInput';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../contexts/userContext';
import { Typography } from '@material-ui/core';
import moment from 'moment';

require('dotenv').config();
const useStyles = makeStyles((theme) => ({
  chatWindow: {
    width: '100%',
    height: '99vh',
    background: '#fff',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionChat: {
    width: '100%',
    minHeight: '93%',
    boxShadow: '-1px -1px 50px lightgrey',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  chatUnit: {
    float: 'left',
    marginBottom: '1rem',
    width: '50%',
    display: 'flex',
    marginLeft: theme.spacing(2),
  },
  chatUnitYours: {
    float: 'right',
    marginBottom: '1rem',
    width: '50%',
    marginRight: theme.spacing(2),
  },
  msgAvatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
  msgHeader: {
    color: 'gray',
  },
  msgHeaderYours: {
    color: 'gray',
    textAlign: 'right',
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
      'linear-gradient(0deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
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
  const [room, setRoom] = useState(null);
  const [chatBackground, setChatBackground] = useState(null);

  const gotoBottom = (id) => {
    // credit: https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page
    var element = document.getElementById(id);
    element.scrollTop = element.scrollHeight - element.clientHeight;
  };

  useEffect(() => {
    // works but then pushes to bottom on every translate toggle
    gotoBottom('section-chat');
    if (userState.user.activeRoom) {
      setRoom(userState.user.activeRoom);
    }
  }, [userState.user]);

  useEffect(() => {
    socket.on('messageFromServer', (msgData) => {
      setRoom((prevRoom) => {
        return {
          ...prevRoom,
          messages: [...prevRoom.messages, msgData],
        };
      });
    });
  }, [socket]);

  useEffect(() => {
    //Not sure why the chat doesn't scroll to bottom upon load.
    gotoBottom('section-chat');
  }, []);

  useEffect(() => {
    if (userState.user.chatBackground) {
      setChatBackground(userState.user.chatBackground.url);
    }
  }, [userState.user]);

  return (
    <div
      className={classes.chatWindow}
      style={chatBackground && { backgroundImage: `url(${chatBackground})` }}
    >
      <div className={classes.sectionChat} id="section-chat">
        {room &&
          room.messages.length > 0 &&
          room.messages.map((msg, index) => {
            const yours = msg.fromUser === userState.user.email;
            const indexOfContact = room.members.findIndex(
              (member) => member.email !== userState.user.email,
            );

            const MessageItemYours = () => {
              return (
                <section className={classes.chatUnitYours}>
                  <div>
                    <Typography
                      variant="subtitle2"
                      className={classes.msgHeaderYours}
                    >
                      {moment(msg.createdOn).calendar()}
                    </Typography>
                    <ChatBubble message={msg.text} yours={true} />
                  </div>
                </section>
              );
            };
            const MessageItemTheirs = () => {
              return (
                <section className={classes.chatUnit}>
                  <img
                    src={room.members[indexOfContact].avatar}
                    className={classes.msgAvatar}
                    alt="contact avatar"
                  />
                  <div>
                    <Typography
                      variant="subtitle2"
                      className={classes.msgHeader}
                    >
                      {moment(msg.createdOn).calendar()}
                    </Typography>
                    {userState.user.activeRoom.displayTranslation ? (
                      <ChatBubble
                        message={
                          msg.translations
                            ? msg.translations[userState.user.primaryLanguage]
                            : msg.text
                        }
                        yours={false}
                      />
                    ) : (
                      <ChatBubble message={msg.text} yours={false} />
                    )}
                  </div>
                </section>
              );
            };
            return yours ? (
              <MessageItemYours key={index} />
            ) : (
              <MessageItemTheirs key={index} />
            );
          })}
      </div>
      <ChatInput gotoBottom={gotoBottom} />
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
