import React, { useContext, useState, createRef } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  DialogTitle,
  List,
  ListItem,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  inviteBtn: {
    border: 'none',
    outline: 'none',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    color: '#4097E8',
    fontWeight: 700,
    cursor: 'pointer',
  },
  invitationLink: {
    width: 400,
  },
  invitationDialogueP: {
    fontWeight: 'bold',
    color: '#0d79de',
  },
  invitationDialogueTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d79de',
    margin: theme.spacing(4),
  },
  invitationEmailList: {
    marginLeft: '2em',
    fontSize: 'smaller',
  },
  invitationEmailBtn: {
    fontSize: 1,
  },
}));

export default function FormDialog() {
  const userId = '5fadeb4e66d8372cd6d05d89';
  const classes = useStyles();
  const inputRef = createRef();

  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [goodEmails, setGoodEmails] = useState([]);
  const [badEmails, setBadEmails] = useState([]);
  const [open, setOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  //retrieve user object from DB and set ID
  const [inviteUrl, setID] = useState(
    'https://www.EK-messenger.com/join/' + userId,
  );

  /*generate unique id for URL */

  /*Open dialog function */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /*close dialog function*/
  const handleClose = () => {
    setOpen(false);
    setEmail('');
  };

  /*Set whatever in input to emails*/
  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  /*push emails to emailList*/
  const addEmail = () => {
    if (!email) return;
    if (!emailList.includes(email)) {
      setEmailList([...emailList, email]);
      setEmail('');
    } else {
      return;
    }
  };

  //handles email invitations
  // maybe use a Material UI loading component?
  const submitInvite = async () => {
    handleClose();

    let goodEmailsHolder = [];
    let badEmailsHolder = [];

    //separate each email into goodEmail or badEmail
    for (const email of emailList) {
      let res = await createInvite(email);
      if (res) goodEmailsHolder.push(email);
      else badEmailsHolder.push(email);
    }

    //send invites only to good emails
    for (const email of goodEmails) {
      await sendInvite(email);
    }

    //placeholer alert of emails sent and bad emails not sent
    const alertMsg = {
      good: {
        msg: 'Successfully sent emails',
        goodEmails,
      },
      bad: {
        msg: 'Failed emails',
        badEmails,
      },
    };

    setGoodEmails(goodEmailsHolder);
    setBadEmails(badEmailsHolder);
    // alert(JSON.stringify(alertMsg));
    setNotifyOpen(true);
    setEmailList([]);
  };

  //POST config header values
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const createInvite = async (toEmail) => {
    try {
      const res = await axios.post(
        `/user/${userId}/invitation`,
        { toEmail },
        config,
      );

      //placeholder alert
      // alert(`Invite created for ${toEmail}!`);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const sendInvite = async (toEmail) => {
    try {
      await axios.post(`/user/${userId}/invitation/send`, { toEmail }, config);
      // alert(`Invite sent to ${toEmail}!`);
    } catch (err) {
      console.error(err);
    }
  };
  console.log('badEmails:', badEmails);
  return (
    <div>
      <button className={classes.inviteBtn} onClick={handleClickOpen}>
        <AddIcon /> Invite Friends
      </button>
      {/* Invitiation Modal Window */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <Typography className={classes.invitationDialogueTitle}>
          Invite Friends to Join Us on EK-Messenger
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
          <div className={classes.invitationLink}>{inviteUrl}</div>
        </DialogContent>
        <DialogActions>
          <CopyToClipboard text={inviteUrl}>
            <Button color="primary">Copy</Button>
          </CopyToClipboard>
        </DialogActions>
        <Button
          variant="outlined"
          color="primary"
          className={classes.margin}
          onClick={submitInvite}
          disabled={emailList.length < 1}
        >
          Send Invitations
        </Button>
      </Dialog>
      {/* Email Confirmation Modal Window */}
      <Dialog open={notifyOpen} onClose={() => setNotifyOpen(false)}>
        <DialogContent>
          <div>
            <DialogTitle>Emails Sent</DialogTitle>
            {goodEmails.map((email, i) => (
              <ListItem key={i}>{email}</ListItem>
            ))}
          </div>
          <div>
            <DialogTitle>Emails Rejected</DialogTitle>
            <List>
              {badEmails.map((email, i) => (
                <ListItem key={i}>{email}</ListItem>
              ))}
            </List>
          </div>
          <Button onClick={() => setNotifyOpen(false)}>close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
