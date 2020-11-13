import React, { useContext } from "react";
import { Container, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";
import { UserContext } from "../userContext";

const useStyles = makeStyles((theme) => ({
  messengerContainer: {
    boxSizing: "border-box",
    background: theme.palette.primary.gray,
    display: "flex",
    justifyContent: "flex-start",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
}));

const Messenger = (props) => {
  const user = useContext(UserContext);
  user.dispatch({ type: "SEND_EMAIL" });
  console.log("user:", user);

  const classes = useStyles();
  return (
    <Container className={classes.messengerContainer}>
      <Sidebar />
      <Hidden smDown>
        <Conversation />
      </Hidden>
    </Container>
  );
};

Messenger.propTypes = {};

export default Messenger;
