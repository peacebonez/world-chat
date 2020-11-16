import React from "react";
import PropTypes from "prop-types";
import { Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const useStyles = makeStyles((theme) => ({
  chatInput: {
    width: "90%",
    marginBottom: 20,
    textAlign: "center",
    "& input": {
      background: theme.palette.primary.gray,
    },
  },
  noStyleBtn: {
    border: "none",
    background: "none",
    outline: "none",
    cursor: "pointer",
  },
}));

const SideBarSearch = ({ setChatShown }) => {
  const classes = useStyles();
  return (
    <div>
      <button className={classes.noStyleBtn} onClick={() => setChatShown(true)}>
        <Typography display="inline" variant="h6">
          Chats
        </Typography>
      </button>
      <button
        className={classes.noStyleBtn}
        onClick={() => setChatShown(false)}
      >
        <Typography display="inline" variant="h6">
          Contacts
        </Typography>
      </button>
      <div className={classes.chatInput}>
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            fullWidth
            autoFocus
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchOutlinedIcon />,
            }}
          />
        </form>
      </div>
    </div>
  );
};

SideBarSearch.propTypes = {};

export default SideBarSearch;
