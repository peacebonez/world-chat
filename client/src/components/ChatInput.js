import React from "react";
import { TextField, InputAdornment, Input } from "@material-ui/core";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import PropTypes from "prop-types";

import useStyles from "../styles/material-styles";

const ChatInput = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.chatInput}>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          autoFocus
          placeholder="Type something..."
          InputProps={{
            endAdornment: [
              <InsertEmoticonOutlinedIcon />,
              <PhotoLibraryOutlinedIcon />,
            ],
          }}
        />
      </form>
    </div>
  );
};

ChatInput.propTypes = {};

export default ChatInput;
