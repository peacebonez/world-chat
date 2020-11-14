import React, { useContext } from "react";
import axios from "axios";
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
  const userId = "5fadeb4e66d8372cd6d05d89";
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
    } else return;
  };

  //need to grab current user id and email

  const submitInvite = () => {
    //handles email invitations
    // maybe use a Material UI loading component?
    const goodEmails = [];
    const badEmails = [];
    emailList.forEach(async (email) => {
      let res = await createInvite(email);
      console.log("res:", res);

      //separating good emails from bad emails
      if (res.status === 200) goodEmails.push(res.data.toEmail);
      else badEmails.push(res.data.toEmail);
    });

    console.log("goodEmails:", goodEmails);
    console.log("badEmails:", badEmails);

    //send invites only to good emails
    goodEmails.forEach(async (email) => {
      await sendInvite(email);
    });

    //placeholer alert of emails sent and bad emails not sent
    const alertMsg = {
      good: {
        msg: "Successfully sent emails",
        goodEmails,
      },
      bad: {
        msg: "Failed emails",
        badEmails,
      },
    };

    alert(JSON.stringify(alertMsg));
    setEmailList([]);
    handleClose();
  };

  //POST config header values
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const createInvite = async (toEmail) => {
    try {
      const res = await axios.post(
        `/user/${userId}/invitation`,
        { toEmail },
        config
      );

      //placeholder alert
      alert(`Invite created for ${toEmail}!`);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const sendInvite = async (toEmail) => {
    try {
      await axios.post(`/user/${userId}/invitation/send`, { toEmail }, config);
      alert(`Invite sent to ${toEmail}!`);
    } catch (err) {
      console.error(err);
    }
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
          size="large"
          color="primary"
          className={classes.margin}
          onClick={submitInvite}
          disabled={emailList.length < 1}
        >
          Send Invitations
        </Button>
      </Dialog>
    </div>
  );
}
