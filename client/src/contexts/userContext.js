import React, { createContext, useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userReducer } from '../reducers/userReducer';
import axios from 'axios';

import { UPDATE_USER, USER_ERROR } from '../reducers/userReducer';

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
          console.log('res:', res);
          dispatch({ type: UPDATE_USER, payload: data });
        } else {
          // if error then redirect to login
          console.log('ERROR USER NOT FOUND');

          dispatch({ type: USER_ERROR });
          history.push('/');
        }
      } catch (err) {
        console.log('ERROR USER NOT FOUND');

        dispatch({ type: USER_ERROR });
        history.push('/');
      }
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
  }, []);

  return (
    <UserContext.Provider
      value={{
        userState,
        userActions: actions,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
