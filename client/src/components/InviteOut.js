import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inviteItem: {
    height: 100,
    width: '85%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 'solid 1px #ddd',
    '& div': {
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

const InviteOut = ({ invite }) => {
  console.log('invite out:', invite);
  const classes = useStyles();
  return (
    <li className={classes.inviteItem}>
      <Typography variant={'h6'}>{invite.toEmail}</Typography>
    </li>
  );
};

InviteOut.propTypes = {
  invite: PropTypes.object.isRequired,
};

export default InviteOut;
