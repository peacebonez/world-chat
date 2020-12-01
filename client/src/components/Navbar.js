import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../contexts/userContext';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import testFlag from '../assets/testflag.jpg';
import tempAvatar from '../assets/temp-avatar.jpg';
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
      width: '50px',
      height: '50px',
      borderRadius: '50%',
    },
  },
  chatterName: {
    margin: theme.spacing(2),
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

const Navbar = (props) => {
  const classes = useStyles();
  const { userState, userActions } = useContext(UserContext);

  const friend =
    userState.user.activeRoom &&
    userState.user.activeRoom.members.filter(
      (member) => member._id !== userState.user.id,
    )[0];

  const handleSideBarView = () => userActions.appSideBarView();

  return (
    <div className={classes.navBar}>
      <div>
        <div className={classes.flexCenter}>
          {userState.user.activeRoom &&
          userState.user.activeRoom.members.length > 2 ? (
            <Typography variant="h5" className={classes.chatterName}>
              Group Chat
            </Typography>
          ) : (
            <>
              <img
                src={(friend && friend.avatar) || tempAvatar}
                alt="friend avatar"
                onClick={handleSideBarView}
              />
              <Typography variant="h5" className={classes.chatterName}>
                {friend && friend.name}
              </Typography>
            </>
          )}

          {/* background will depend on online status */}
          <span
            className={`${classes.statusIcon} ${classes.onlineIcon}`}
          ></span>
          <Typography variant="subtitle1">Online</Typography>
        </div>
      </div>
      <div className={classes.flexCenter}>
        <Typography variant="subtitle2">Original Language</Typography>
        <Switch color="primary" name="language" />
        <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
      </div>
    </div>
  );
};

export default Navbar;
