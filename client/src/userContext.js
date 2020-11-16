import React, { createContext, useReducer } from "react";

const initialState = {
  email: "",
  contacts: [],
  primaryLanguage: "",
  loading: true,
  error: {},
};

export const UserContext = createContext(initialState);
const { Provider } = UserContext;

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SEND_EMAIL":
        console.log("EMAIL SENT!");
      default:
        return state;
    }
  });

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
