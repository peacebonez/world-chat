import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import tempAvatar from '../assets/temp-avatar.jpg';
import { Typography, Menu, MenuItem, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { UserContext } from '../contexts/userContext';
import AppAlert from './AppAlert';

const useStyles = makeStyles((theme) => ({
  sideBarHeader: {
    height: 100,
    width: '85%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    direction: 'ltr',
    '& div': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sideBarImgWrapper: {
    '& span': {
      position: 'relative',
      transform: 'translate(-200%,180%)',
    },
  },
  fileInput: {
    position: 'absolute',
    zIndex: 4,
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    opacity: 0,
    cursor: 'pointer',
  },
  sideBarImg: {
    borderRadius: '100%',
    overflow: 'hidden',
    width: '70px',
    height: '70px',
    marginRight: theme.spacing(1),
    zIndex: 2,
  },
  sideBarImgHover: {
    opacity: 0.5,
    background: '#000',
  },
  addIcon: {
    color: '#fff',
    position: 'absolute',
    fontSize: '200%',
    transform: 'translateX(17px)',
    display: 'none',
    zIndex: 3,
    cursor: 'pointer',
  },
  shown: {
    display: 'block',
  },
  dotMenu: {
    cursor: 'pointer',
    color: '#BCC8D9',
  },
  noStyleBtn: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  statusIcon: {
    width: 12,
    height: 12,
    border: 'solid white 1px',
    borderRadius: '50%',
    zIndex: 4,
  },
  onlineIcon: { background: '#4DED84' },
  offlineIcon: { background: 'lightgray' },
}));

const SideBarHeader = () => {
  const { userState, userActions } = useContext(UserContext);
  const classes = useStyles();

  const [userAvatar, setUserAvatar] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpload = async (e) => {
    await userActions.avatarUpload(e);
    window.location.reload();
  };

  useEffect(() => {
    if (userState.user.avatar) {
      setUserAvatar(userState.user.avatar.url);
    }
  }, [userState.user]);

  //redirects after logout
  if (!userState.user.name) return <Redirect to="/" />;

  return (
    <div className={classes.sideBarHeader}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleUpload}
            className={classes.fileInput}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          />

          <AddIcon
            className={`${classes.addIcon} ${isHover && classes.shown} `}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          />
          <img
            src={userAvatar ? userState.user.avatar.url : tempAvatar}
            alt="user-avatar"
            className={`${classes.sideBarImg} ${
              isHover && classes.sideBarImgHover
            }`}
          />

          <span
            className={`${classes.statusIcon} ${classes.onlineIcon}`}
          ></span>
        </div>
        <Typography variant="h5">{userState.user.name}</Typography>
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={userActions.logout}
      >
        Log Out
      </Button>
      {/* <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={handleClose}
      >
        <MenuItem onClick={userActions.logout}>Logout</MenuItem>
      </Menu> */}
      {/* Error alerts */}
      <AppAlert trigger={userState.errorMsg} />
    </div>
  );
};

export default SideBarHeader;
