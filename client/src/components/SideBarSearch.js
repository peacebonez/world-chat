import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {DebounceInput} from 'react-debounce-input';

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
      color: '#000',
    },
  },
  headerActive: {
    color: '#000',
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
          <Typography display="inline" variant="h6" className={classes.header}>
            Chats
          </Typography>
        </button>
        <button
          className={classes.noStyleBtn}
          onClick={(e) => showComponent(e.target.innerHTML)}
        >
          <Typography display="inline" variant="h6" className={classes.header}>
            Contacts
          </Typography>
        </button>
        <button
          className={classes.noStyleBtn}
          onClick={(e) => showComponent(e.target.innerHTML)}
        >
          <Typography display="inline" variant="h6" className={classes.header}>
            Invites
          </Typography>
        </button>
      </div>
      <div>
        <form noValidate autoComplete="off">
          <DebounceInput 
          element={TextField}
          debounceTimeout={300}
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
