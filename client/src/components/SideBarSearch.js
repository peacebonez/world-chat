import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { DebounceInput } from 'react-debounce-input';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: theme.spacing(5),
    direction: 'ltr',
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
  handleInvitesShow,
  handleContactsShow,
  handleChatsShow,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div>
        <button className={classes.noStyleBtn} onClick={handleChatsShow}>
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
        <button className={classes.noStyleBtn} onClick={handleContactsShow}>
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
        <button className={classes.noStyleBtn} onClick={handleInvitesShow}>
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
          <DebounceInput
            element={TextField}
            debounceTimeout={300}
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

SideBarSearch.propTypes = {
  chatsShown: PropTypes.bool,
  invitesShown: PropTypes.bool,
  contactsShown: PropTypes.bool,
  handleInvitesShow: PropTypes.func.isRequired,
  handleChatsShow: PropTypes.func.isRequired,
  handleContactsShow: PropTypes.func.isRequired,
};

export default SideBarSearch;
