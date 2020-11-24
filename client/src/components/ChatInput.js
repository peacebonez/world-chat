import React from 'react';
import { TextField, Button } from '@material-ui/core';
import Smiley from '@material-ui/icons/InsertEmoticonOutlined';
import PhotosIcon from '@material-ui/icons/PhotoLibraryOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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

const ChatInput = () => {
  const classes = useStyles();
  return (
    <div className={classes.chatInput}>
      <form noValidate autoComplete="off">
        <TextField
          variant="outlined"
          fullWidth
          autoFocus
          placeholder="Type something..."
          InputProps={{
            endAdornment: [<Smiley key={1} />, <PhotosIcon key={2} />],
          }}
        />
        <Button variant="outlined" color="primary">
          <ChevronRightIcon />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
