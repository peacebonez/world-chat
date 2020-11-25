import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import tempAvatar from '../assets/temp-avatar.jpg';
import {
  Typography,
  Menu,
  MenuItem,
  Button,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';

import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  sideBarHeader: {
    height: 100,
    width: '85%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  const { userState } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();

  const [userAvatar, setUserAvatar] = useState(null);
  const [errorAvatar, setErrorAvatar] = useState(false);
  const [errorAvatarMsg, setErrorAvatarMsg] = useState('');
  const [isHover, setIsHover] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const data = new FormData();
    data.append('file', file, file.name);

    try {
      const res = await axios.post('/user/avatar', data);
      setUserAvatar(res.data.avatar.url);
    } catch (err) {
      console.log(err.message);
      setErrorAvatarMsg('Error uploading image');
      setErrorAvatar(true);
    }
  };

  const handleLogout = async () => {
    history.push('/');
    await axios.get('/user/logout');
    try {
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    let timer;
    if (errorAvatar) {
      timer = setTimeout(() => {
        setErrorAvatar(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (userState.user.avatar) {
      setUserAvatar(userState.user.avatar.url);
    }
  }, [userState]);

  return (
    <div className={classes.sideBarHeader}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <input
            type="file"
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
            src={userAvatar || tempAvatar}
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
      <Button className={classes.noStyleBtn} onClick={handleClick}>
        <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {/* Error alerts */}
      <Snackbar
        open={errorAvatar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          {errorAvatarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SideBarHeader;
