import React, { useContext, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Smiley from '@material-ui/icons/InsertEmoticonOutlined';
import PhotosIcon from '@material-ui/icons/PhotoLibraryOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { UserContext } from '../contexts/userContext';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chatInput: {
    width: '100%',
    textAlign: 'center',
    background: theme.palette.primary.gray,
    '& input': {
      background: theme.palette.primary.gray,
    },
  },
}));

const ChatInput = ({ gotoBottom }) => {
  const classes = useStyles();
  const { socket, userState, userActions } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message === '') return;

    const sendingMsgData = {
      name: userState.user.name,
      email: userState.user.email,
      primaryLanguage: userState.user.primaryLanguage,
      text: message,
      room: userState.user.activeRoom._id,
      createdOn: Date.now(),
    };

    gotoBottom('section-chat');
    socket.emit('messageToClient', sendingMsgData);
    await userActions.storeMessage(sendingMsgData);
    setMessage('');
  };

  return (
    <div className={classes.chatInput}>
      <form noValidate autoComplete="off" onSubmit={sendMessage}>
        <TextField
          variant="outlined"
          fullWidth
          autoFocus
          placeholder="Type something... (Press ENTER to send)"
          InputProps={{
            endAdornment: [<Smiley key={1} />, <PhotosIcon key={2} />],
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* <Button 
          variant="outlined" 
          color="primary"
          onClick={sendMessage}
        >
          <ChevronRightIcon />
        </Button> */}
      </form>
    </div>
  );
};

export default ChatInput;
