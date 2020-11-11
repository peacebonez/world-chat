import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";
import { Container } from "@material-ui/core";

import Navbar from "./Navbar";

const Conversation = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.conversation}>
      <Navbar />
    </Container>
  );
};

Conversation.propTypes = {};

export default Conversation;
