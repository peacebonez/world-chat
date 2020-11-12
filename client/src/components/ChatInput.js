import React from "react";
import { TextField } from "@material-ui/core";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chatInput: {
    width: "90%",
    marginBottom: theme.spacing(4),
    textAlign: "center",
    "& input": {
      background: "#F5F7FB",
    },
  },
}));

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
