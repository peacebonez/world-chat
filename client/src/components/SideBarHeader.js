import React, { useContext, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import happyChatter from '../assets/happy-chatter.png';
import { Typography, Menu, MenuItem, Button } from '@material-ui/core';
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
  sideBarImg: {
    borderRadius: '100%',
    overflow: 'hidden',
    width: '70px',
    marginRight: theme.spacing(1),
    cursor: 'pointer',
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
  const classes = useStyles();

  const [userAvatar, setUserAvatar] = useState(happyChatter);
  const [isHover, setIsHover] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectedFile = (e) => {
    setUserAvatar(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setUserAvatar(file);

    const data = new FormData();
    data.append('file', file, file.name);

    try {
      const res = await axios.post('/user/avatar', data);
      console.log('res:', res);
    } catch (err) {}
  };
  console.log('userAvatar:', userAvatar);

  return (
    <div className={classes.sideBarHeader}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <input type="file" onChange={handleUpload} />

          <AddIcon
            className={`${classes.addIcon} ${isHover && classes.shown} `}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          />
          <img
            src={userState.user.avatar ? userState.user.avatar : userAvatar}
            className={`${classes.sideBarImg} ${
              isHover && classes.sideBarImgHover
            }`}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
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
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default SideBarHeader;
