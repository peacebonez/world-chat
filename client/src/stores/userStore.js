// store.js
import React, { createContext, useReducer } from 'react';

const initialState = { user: null };
const store = createContext(initialState);
const { Provider } = store;

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCH_DATA':
        // const newState = // do something with the action
        // return newState;
        console.log('here');
        return { ...state, user: action.payload };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, UserProvider };
