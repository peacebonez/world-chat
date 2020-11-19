import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: theme.spacing(5),
  },
  searchInput: {
    width: '80%',
    marginBottom: 20,
    background: theme.palette.secondary.main,
    '& input': {
      background: theme.palette.secondary.main,
      paddingLeft: theme.spacing(1),
    },
  },
  noStyleBtn: {
    border: 'none',
    background: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  header: {
    color: '#BEC5D3',
    '&:hover': {
      color: theme.palette.primary.blue,
    },
  },
  headerActive: {
    color: theme.palette.primary.blue,
    fontSize: 26,
  },
}));

const SideBarSearch = ({
  chatsShown,
  invitesShown,
  contactsShown,
  setChatsShown,
  setContactsShown,
  setInvitesShown,
}) => {
  const classes = useStyles();

  const showComponent = (type) => {
    switch (type) {
      case 'Chats':
        setChatsShown(true);
        setContactsShown(false);
        setInvitesShown(false);
        break;
      case 'Contacts':
        setChatsShown(false);
        setContactsShown(true);
        setInvitesShown(false);
        break;
      case 'Invites':
        setChatsShown(false);
        setContactsShown(false);
        setInvitesShown(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <button
          className={classes.noStyleBtn}
          onClick={(e) => showComponent(e.target.innerHTML)}
        >
          <Typography
            display="inline"
            variant="h6"
            className={`${classes.header} ${
              chatsShown && classes.headerActive
            }`}
          >
            Chats
          </Typography>
        </button>
        <button
          className={classes.noStyleBtn}
          onClick={(e) => showComponent(e.target.innerHTML)}
        >
          <Typography
            display="inline"
            variant="h6"
            className={`${classes.header} ${
              contactsShown && classes.headerActive
            }`}
          >
            Contacts
          </Typography>
        </button>
        <button
          className={classes.noStyleBtn}
          onClick={(e) => showComponent(e.target.innerHTML)}
        >
          <Typography
            display="inline"
            variant="h6"
            className={`${classes.header} ${
              invitesShown && classes.headerActive
            }`}
          >
            Invites
          </Typography>
        </button>
      </div>
      <div>
        <form noValidate autoComplete="off">
          <TextField
            className={classes.searchInput}
            variant="outlined"
            fullWidth
            autoFocus
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <SearchOutlinedIcon className={classes.noStyleBtn} />
              ),
            }}
          />
        </form>
      </div>
    </div>
  );
};

SideBarSearch.propTypes = {};

export default SideBarSearch;
