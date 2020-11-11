import React from "react";
import PropTypes from "prop-types";
import { Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const SideBarSearch = (props) => {
  const useStyles = makeStyles((theme) => ({
    chatInput: {
      width: "90%",
      marginBottom: 20,
      textAlign: "center",
      "& input": {
        background: "#F5F7FB",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Typography display="inline" variant="h6">
        Chats
      </Typography>
      <Typography display="inline" variant="h6">
        Contacts
      </Typography>
      <div className={classes.chatInput}>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
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
