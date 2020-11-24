import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import testFlag from '../assets/testflag.jpg';
import { Typography, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  navBar: {
    width: '100%',
    padding: '0 25px',
    height: 100,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& img': {
      width: '10%',
      borderRadius: '50%',
    },
  },
  dotMenu: {
    cursor: 'pointer',
    color: '#BCC8D9',
  },
  statusIcon: {
    width: 12,
    height: 12,
    border: 'solid white 1px',
    borderRadius: '50%',
  },
  onlineIcon: { background: '#4DED84' },
  offlineIcon: { background: 'lightgray' },
}));

//TODOS
//Will have 2 types of Navbars: group and one-on-one

const Navbar = () => {
  const classes = useStyles();

  const handleSwitch = () => {
    // show original language
    return
  };

  return (
    <div className={classes.navBar}>
      <div>
        <div className={classes.flexCenter}>
          <img src={testFlag} alt="avatar of your message receiver" />
          <Typography variant="h5">Santiago</Typography>
          {/* background will depend on online status */}
          <span
            className={`${classes.statusIcon} ${classes.onlineIcon}`}
          ></span>
          <Typography variant="subtitle1">Online</Typography>
        </div>
      </div>
      <div className={classes.flexCenter}>
        <Typography variant="subtitle2">Original Language</Typography>
        <Switch color="primary" name="language"  />
        <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
      </div>
    </div>
  );
};

export default Navbar;
