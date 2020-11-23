import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  ListItem,
  List,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  invitationDialogueTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d79de',
  },
}));

const InviteNotification = ({
  successEmails,
  failedEmails,
  notifyOpen,
  setNotifyOpen,
}) => {
  const classes = useStyles();
  return (
    <Dialog open={notifyOpen} onClose={() => setNotifyOpen(false)}>
      <DialogContent>
        <div>
          <DialogTitle className={classes.invitationDialogueTitle}>
            Emails Sent
          </DialogTitle>
          <List>
            {successEmails.map((email, i) => (
              <ListItem key={i}>-{<Typography>{email}</Typography>}</ListItem>
            ))}
          </List>
        </div>
        <div>
          <DialogTitle className={classes.invitationDialogueTitle}>
            Emails Rejected
          </DialogTitle>
          <List>
            {failedEmails.map((email, i) => (
              <ListItem key={i}>
                <Typography>-{email}</Typography>
              </ListItem>
            ))}
          </List>
        </div>
        <Button onClick={() => setNotifyOpen(false)}>close</Button>
      </DialogContent>
    </Dialog>
  );
};

InviteNotification.propTypes = {
  setNotifyOpen: PropTypes.func.isRequired,
  notifyOpen: PropTypes.bool.isRequired,
  successEmails: PropTypes.array,
  failedEmails: PropTypes.array,
};

export default InviteNotification;
