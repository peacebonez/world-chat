import React from "react";
import { TextField } from "@material-ui/core";
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
        />
      </form>
    </div>
  );
};

ChatInput.propTypes = {};

export default ChatInput;
