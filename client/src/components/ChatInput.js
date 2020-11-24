import React, { useContext, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Smiley from '@material-ui/icons/InsertEmoticonOutlined';
import PhotosIcon from '@material-ui/icons/PhotoLibraryOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { UserContext } from '../contexts/userContext';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chatInput: {
    width: '90%',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    background: theme.palette.primary.gray,
    '& input': {
      background: theme.palette.primary.gray,
    },
  },
}));

const ChatInput = (props) => {
  const classes = useStyles();
  const { socket, userState } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(userState)
    const data = {
      email: userState.user.email,
      message,
      room: '123'
    };
    console.log(data.message)
    socket.emit('messageToClient', data);
    setMessage('');
  };

  return (
    <div className={classes.chatInput}>
      <form noValidate autoComplete="off" onSubmit={sendMessage}>
        <TextField
          variant="outlined"
          fullWidth
          autoFocus
          placeholder="Type something..."
          value={message}
          InputProps={
            {
              // endAdornment: [<Smiley />, <PhotosIcon />],
            }
          }
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button 
          variant="outlined" 
          color="primary"
          onClick={sendMessage}
        >
          <ChevronRightIcon />
        </Button>
      </form>
    </div>
  );
};

ChatInput.propTypes = {};

export default ChatInput;
