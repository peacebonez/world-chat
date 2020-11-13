import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { sendInvite, createInvite } from "../actions/user-actions";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  invitationLink: {
    width: 400,
  },
  invitationDialogueP: {
    fontWeight: "bold",
    color: "#0d79de",
  },
  invitationDialogueTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d79de",

    margin: theme.spacing(4),
  },
  invitationEmailList: {
    marginLeft: "2em",
    fontSize: "smaller",
  },
  invitationEmailBtn: {
    fontSize: 1,
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const inputRef = React.createRef();
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  //retrieve user object from DB and set ID
  const [uniqueID, setID] = React.useState(
    "https://www.EKLN-messenger.com/join/" +
      (Math.floor(Math.random() * 90000000) + 10000000)
  );
  const [emailList, setEmailList] = React.useState([]);

  /*generate unique id for URL */

  /*Open dialog function */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /*close dialog function*/
  const handleClose = () => {
    setOpen(false);
    setEmail("");
  };

  /*Set whatever in input to emails*/
  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  /*push emails to emailList*/
  const addEmail = () => {
    if (!emailList.includes(email)) {
      setEmailList([...emailList, email]);
      setEmail("");
    } else {
      //placeholder alert
      alert("Email already in list");
      setEmail("");
    }
  };

  const submitEmail = async () => {
    handleClose();

    //need to grab current user id and email
    sendInvite("5fadeb4e66d8372cd6d05d89", emailList);
    createInvite("5fadeb4e66d8372cd6d05d89", emailList);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Invite Friends
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <Typography className={classes.invitationDialogueTitle}>
          Invite Friends to Join Us on EKLN-Messenger
        </Typography>
        <DialogContent>
          <Typography className={classes.invitationDialogueP}>
            Enter emails to invite friends
          </Typography>
          <TextField
            className={classes.emailInput}
            autoFocus
            margin="dense"
            variant="outlined"
            id="email"
            label="Email Address"
            type="email"
            fullWidth={true}
            value={email}
            ref={inputRef}
            onChange={inputEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addEmail} color="primary">
            Add
          </Button>
        </DialogActions>
        {emailList.map((email) => (
          <div className={classes.invitationEmailList} key={email}>
            -{email}
          </div>
        ))}
        <DialogContent>
          <Typography className={classes.invitationDialogueP}>
            Copy ref-link to invite
          </Typography>
          <div className={classes.invitationLink}>{uniqueID}</div>
        </DialogContent>
        <DialogActions>
          <CopyToClipboard text={uniqueID}>
            <Button color="primary">Copy</Button>
          </CopyToClipboard>
        </DialogActions>
        <Button
          variant="outlined"
          color="primary"
          className={classes.margin}
          onClick={submitEmail}
          disabled={emailList.length < 1}
        >
          Send Invitations
        </Button>
      </Dialog>
    </div>
  );
}
