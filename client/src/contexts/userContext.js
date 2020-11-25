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
} from '../reducers/userReducer';

const serverURL = process.env.serverURL;
const socket = io(serverURL);

const UserContext = createContext();

const initialState = {
  user: { name: '' },
};

const UserProvider = (props) => {
  let history = useHistory();
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const actions = {
    fetchUser: async () => {
      try {
        const res = await axios.get('/user/get_current_user');

        if (res.status === 200) {
          const data = await res.data;

          dispatch({ type: UPDATE_USER, payload: data });
          history.push('/messenger');
        } else {
          dispatch({
            type: USER_ERROR,
            payload: { errorMsg: 'User Not Found' },
          });
          history.push('/');
        }
      } catch (err) {
        dispatch({
          type: USER_ERROR,
          payload: { errorMsg: 'User Not Found' },
        });
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
        if (err.message.includes('400'))
          dispatch({
            type: USER_ERROR,
            payload: { errorMsg: 'Invalid Credentials' },
          });
        if (err.message.includes('404'))
          dispatch({
            type: USER_ERROR,
            payload: { errorMsg: 'User Not Found' },
          });
        if (err.message.includes('500'))
          dispatch({
            type: USER_ERROR,
            payload: { errorMsg: 'Server Error' },
          });
      }
    },
    logout: async () => {
      try {
        await axios.get('/user/logout');
        dispatch({ type: USER_LOGOUT });
      } catch (err) {
        console.log(err.message);
      }
    },
    clearErrors: () => {
      dispatch({ type: CLEAR_ERRORS });
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

    let timer;
    if (userState.user.errorMsg) {
      timer = setTimeout(() => {
        actions.clearErrors();
      }, 3000);
    }
    return () => clearTimeout(timer);

    // TODO: probably want to check if user is successfully logged in before connecting
    socket.on('connect', () => {
      console.log('Connected, assigned:', socket.id, socket.connected);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

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
