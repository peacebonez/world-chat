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
    background: '#E9EEF9',
    '& input': {
      background: '#E9EEF9',
    },
  },
  noStyleBtn: {
    border: 'none',
    background: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
}));

const SideBarSearch = ({ setChatShown, setContactsShown, setInvitesShown }) => {
  const classes = useStyles();

  const showComponent = (type) => {
    switch (type) {
      case 'Chats':
        setChatShown(true);
        setContactsShown(false);
        setInvitesShown(false);
        break;
      case 'Contacts':
        setChatShown(false);
        setContactsShown(true);
        setInvitesShown(false);
        break;
      case 'Invites':
        setChatShown(false);
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
          <Typography display="inline" variant="h6">
            Chats
          </Typography>
        </button>
        <button
          className={classes.noStyleBtn}
          onClick={(e) => showComponent(e.target.innerHTML)}
        >
          <Typography display="inline" variant="h6">
            Contacts
          </Typography>
        </button>
        <button
          className={classes.noStyleBtn}
          onClick={(e) => showComponent(e.target.innerHTML)}
        >
          <Typography display="inline" variant="h6">
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
              startAdornment: <SearchOutlinedIcon />,
            }}
          />
        </form>
      </div>
    </div>
  );
};

SideBarSearch.propTypes = {};

export default SideBarSearch;
