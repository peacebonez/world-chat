import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import happyChatter from '../assets/happy-chatter.png';
import { Typography } from '@material-ui/core';
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

  const onFileChange = (e) => {
    setUserAvatar(e.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      'avatar',
      userAvatar,
      userState.user.email + '_' + 'avatar',
    );
  };

  return (
    <div className={classes.sideBarHeader}>
      <div>
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/png, image/jpeg"
        />
        {/* <form
          action="/file-upload"
          name="avatar"
          method="post"
          enctype="multipart/form-data"
          className="dropzone"
        > */}
        <div className={classes.sideBarImgWrapper}>
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
        {/* </form> */}
        <Typography variant="h5">{userState.user.name}</Typography>
      </div>
      <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
    </div>
  );
};

SideBarHeader.propTypes = {};

export default SideBarHeader;
