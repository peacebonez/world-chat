import React from "react";
import { TextField } from "@material-ui/core";
import Smiley from "@material-ui/icons/InsertEmoticonOutlined";
import PhotosIcon from "@material-ui/icons/PhotoLibraryOutlined";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chatInput: {
    width: "90%",
    marginBottom: theme.spacing(4),
    textAlign: "center",
    "& input": {
      background: theme.palette.primary.gray,
    },
  },
}));

const ChatInput = (props) => {
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
            endAdornment: [<Smiley />, <PhotosIcon />],
          }}
        />
      </form>
    </div>
  );
};

ChatInput.propTypes = {};

export default ChatInput;
