import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { sendInvite } from "../actions/user-actions";

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
    // if (emailList.findIndex((email) => email == email) < 0)
    if (!emailList.includes(email)) {
      setEmailList([...emailList, email]);
      setEmail("");
    } else return;
  };

  const submitEmail = async () => {
    handleClose();

    //need to grab current user id and email
    sendInvite("5fad63358f96786e507a0b74", emailList);
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
        <p className={classes.invitationDialogueTitle}>
          Invite Friends to Join Us on EKLN-Messenger
        </p>
        <DialogContent>
          <p className={classes.invitationDialogueP}>
            Enter emails to invite friends!
          </p>
          <TextField
            autoFocus
            margin="dense"
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
          <div key={email} className={classes.invitationEmailList} id={email}>
            -{email}
          </div>
        ))}
        <DialogContent>
          <p className={classes.invitationDialogueP}>Copy ref-link to invite</p>
          <div className={classes.invitationLink}>{uniqueID}</div>
        </DialogContent>
        <DialogActions>
          <CopyToClipboard text={uniqueID}>
            <Button color="primary">Copy</Button>
          </CopyToClipboard>
        </DialogActions>
        <Button
          variant="outlined"
          size="large"
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
