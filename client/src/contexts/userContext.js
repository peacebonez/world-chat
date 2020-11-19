import React, { createContext, useReducer, useEffect } from 'react';
import { userReducer } from '../reducers/userReducer';
import axios from 'axios';

const UserContext = createContext();

const initialState = {
  user: { name: '' },
};

const UserProvider = (props) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const actions = {
    fetchUser: async () => {
      const res = await axios.get(`/user/get_current_user`);

      if (res.status === 200) {
        const data = await res.data;

        dispatch({ type: 'UPDATE_USER', payload: data });
      } else if (res.status === 400) {
        // if error then redirect to login
        console.log('ERROR USER NOT FOUND');
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
        userState: userState,
        userActions: actions,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
