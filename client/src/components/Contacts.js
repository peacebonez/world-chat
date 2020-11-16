import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import happyChatter from "../assets/happy-chatter.png";
import PropTypes from "prop-types";
import Contact from "./Contact";

const testContacts = [
  { avatar: happyChatter, name: "Doug", isOnline: true },
  { avatar: happyChatter, name: "Sandra", isOnline: false },
  { avatar: happyChatter, name: "Michael", isOnline: false },
  { avatar: happyChatter, name: "Chet", isOnline: true },
  { avatar: happyChatter, name: "Kwame", isOnline: false },
  { avatar: happyChatter, name: "Dong", isOnline: true },
  { avatar: happyChatter, name: "a", isOnline: true },
  { avatar: happyChatter, name: "b", isOnline: true },
  { avatar: happyChatter, name: "c", isOnline: true },
  { avatar: happyChatter, name: "d", isOnline: true },
  { avatar: happyChatter, name: "e", isOnline: true },
  { avatar: happyChatter, name: "f", isOnline: true },
  { avatar: happyChatter, name: "g", isOnline: true },
  { avatar: happyChatter, name: "h", isOnline: true },
  { avatar: happyChatter, name: "i", isOnline: true },
  { avatar: happyChatter, name: "j", isOnline: true },
];

const useStyles = makeStyles((theme) => ({
  contactsContainer: {
    width: "80%",
  },
  contactList: {
    paddingLeft: 0,
  },
}));

const Contacts = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.contactsContainer}>
      <h1>Contacts</h1>
      <ul className={classes.contactList}>
        {testContacts.map((contact) => {
          const { avatar, name, isOnline } = contact;
          return <Contact avatar={avatar} name={name} isOnline={isOnline} />;
        })}
      </ul>
    </div>
  );
};

Contacts.propTypes = {};

export default Contacts;
