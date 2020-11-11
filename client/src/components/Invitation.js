import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function FormDialog() {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(3),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const inputRef = React.createRef();
  const [emails, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);
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
  };

  /*Set whatever in input to emails*/
  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  /*push emails to emailList*/
  const addEmail = () => {
    if (emailList.findIndex((email) => email == emails) < 0)
      setEmailList([...emailList, emails]);
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
        <p className="invitation-dialog-title">
          Invite Friends to Join Us on EKLN-Messenger
        </p>
        <DialogContent>
          <p className="invitation-dialog-p">Enter emails to invite friedns</p>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth={true}
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
          <div className="invitation-emailList" id={email}>
            -{email}
          </div>
        ))}
        <DialogContent>
          <p className="invitation-dialog-p">Copy ref-link to invite</p>
          <div id="invitation-link">{uniqueID}</div>
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
          onClick={handleClose}
        >
          Send Invitations
        </Button>
      </Dialog>
    </div>
  );
}
