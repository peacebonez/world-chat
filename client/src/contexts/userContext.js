import React, { createContext, useReducer, useEffect } from 'react';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { userReducer } from '../reducers/userReducer';
import axios from 'axios';

import {
  UPDATE_USER,
  USER_ERROR,
  USER_LOGOUT,
  CLEAR_ERRORS,
  GET_CONVERSATIONS,
  SWITCH_CONVERSATION,
} from '../reducers/userReducer';

const serverURL = process.env.serverURL;
const socket = io(serverURL);

const UserContext = createContext();

const initialState = {
  user: { name: '' },
};

const UserProvider = (props) => {
  const history = useHistory();
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const actions = {
    signUpUser: async (name, email, password, primaryLanguage) => {
      try {
        const res = await axios.post('/user/signup', {
          name,
          email,
          password,
          primaryLanguage,
        });
        const data = res.data;
        dispatch({ type: UPDATE_USER, payload: data });
        history.push('/messenger');
      } catch (err) {
        if (err.message.includes('400')) {
          dispatch({
            type: USER_ERROR,
            payload: 'User already exists.',
          });
        }

        if (err.message.includes('500')) {
          dispatch({
            type: USER_ERROR,
            payload: 'Server error',
          });
        }
      }
    },
    fetchUser: async () => {
      try {
        const res = await axios.get('/user/get_current_user');

        if (res.status === 200) {
          const data = await res.data;

          dispatch({ type: UPDATE_USER, payload: data });
          history.push('/messenger');
        } else {
          history.push('/');
        }
      } catch (err) {
        history.push('/');
      }
    },
    login: async (email, password) => {
      try {
        const res = await axios.post('/user/login', { email, password });
        if (res && (res.status === 200 || res.status === 201)) {
          await actions.fetchUser();
          history.push('/messenger');
        }

        return res;
      } catch (err) {
        let errorMsg;
        if (err.message.includes('400')) errorMsg = 'Invalid Credentials';
        if (err.message.includes('404')) errorMsg = 'User not found';
        if (err.message.includes('500')) errorMsg = 'Server error';

        dispatch({
          type: USER_ERROR,
          payload: errorMsg,
        });
      }
    },
    fetchPendingInvites: async () => {
      try {
        const res = await axios.get('user/invitations/pending');

        //if response is ok or user has no invites
        if (res.status === 200 || res.status === 204) {
          return res.data;
        }
        if (res.status === 404 || res.status === 500) {
          //user not found
          dispatch({
            type: USER_ERROR,
            payload: 'Error fetching invites',
          });
          return res.data;
        }
      } catch (err) {
        console.log(err.message);
        dispatch({
          type: USER_ERROR,
          payload: 'Error fetching invites',
        });
      }
    },
    fetchConversations: async () => {
      try {
        const res = await axios.get('/user/conversations');
        const data = res.data;
        dispatch({ type: GET_CONVERSATIONS, payload: data });
        return res;
      } catch (err) {
        dispatch({
          type: USER_ERROR,
          payload: 'Error fetching chats',
        });
      }
    },
    logout: async () => {
      try {
        await axios.get('/user/logout');
        dispatch({ type: USER_LOGOUT });
      } catch (err) {
        console.log(err.message);
        dispatch({
          type: USER_ERROR,
          payload: 'Logout Error',
        });
      }
    },
    clearErrors: () => {
      dispatch({ type: CLEAR_ERRORS });
    },
    switchConversation: (room) => {
      dispatch({
        type: SWITCH_CONVERSATION,
        payload: room,
      });
    },
  };

  useEffect(() => {
    /*
     * This gets loaded every time the App loads
     * It will try to fetchUser
     * If you're logged in, you may proceed and the most up to date user info
     * will be store in the user state
     * Otherwise, it will redirect you to the login page
     */
    actions.fetchUser();

    // TODO: probably want to check if user is successfully logged in before connecting
    socket.on('connect', () => {
      console.log('Connected, assigned:', socket.id, socket.connected);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    let timer;
    if (userState.errorMsg) {
      timer = setTimeout(() => {
        actions.clearErrors();
      }, 3000);
    }
    return () => clearTimeout(timer);
  });

  return (
    <UserContext.Provider
      value={{
        userState,
        userActions: actions,
        socket,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
