import React, { useContext } from "react";
import { Container, Hidden } from "@material-ui/core";
import useStyles from "../styles/material-styles";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";
import { UserContext } from "../userContext";

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
