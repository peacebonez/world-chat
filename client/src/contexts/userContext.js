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
  ADD_CONVERSATION,
  UPDATE_MESSAGES,
  MESSAGE_SENT,
  CHANGE_USER_VIEW,
  MOBILE_MODE,
  TOGGLE_TRANSLATION,
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
        const data = res.data;
        if (res && (res.status === 200 || res.status === 201)) {
          await actions.fetchUser();
          history.push('/messenger');
        }

        dispatch({ type: UPDATE_USER, payload: data });
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
    avatarUpload: async (e) => {
      e.preventDefault();

      const file = e.target.files[0];

      const data = new FormData();
      if (!data) {
        dispatch({
          type: USER_ERROR,
          payload: 'Error uploading image',
        });
        return;
      }

      data.append('file', file, file.name);

      try {
        const res = await axios.post('/user/avatar', data);

        if (res.status === 200) {
          dispatch({ type: UPDATE_USER, payload: res.data });
          return res.data;
        } else {
          dispatch({
            type: USER_ERROR,
            payload: 'Error uploading image',
          });
        }
      } catch (err) {
        console.log(err.message);
        dispatch({
          type: USER_ERROR,
          payload: 'Error uploading image',
        });
      }
    },
    fetchPendingInvites: async () => {
      try {
        const res = await axios.get('user/invitations/pending');

        //if response is ok or user has no invites
        if (res.status === 200 || res.status === 204) {
          return res.data;
        } else {
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
    addConversation: async (members) => {
      try {
        const res = axios.post('/conversation/add', members);
        if (res.status === 409) return;
        if (res.status === 200) {
          const data = res.data;
          dispatch({ type: ADD_CONVERSATION, payload: data });
          return data;
        } else {
          return dispatch({
            type: USER_ERROR,
            payload: 'Error creating conversation',
          });
        }
      } catch (err) {
        dispatch({
          type: USER_ERROR,
          payload: 'Error creating conversation',
        });
      }
    },
    fetchSingleConversation: async (members) => {
      const memberIDs = members.map((member) => member._id);
      try {
        const res = await axios.get(`/conversation/?members=${memberIDs}`);
        if (res.status !== 200)
          return dispatch({
            type: USER_ERROR,
            payload: 'Error getting conversation',
          });

        const data = res.data;
        return data;
      } catch (err) {
        return dispatch({
          type: USER_ERROR,
          payload: 'Error getting conversation',
        });
      }
    },
    switchConversation: (room) => {
      dispatch({
        type: SWITCH_CONVERSATION,
        payload: room,
      });
    },
    fetchConversations: async () => {
      try {
        const res = await axios.get('/user/conversations');
        const data = res.data;
        dispatch({ type: GET_CONVERSATIONS, payload: data });
        return data;
      } catch (err) {
        dispatch({
          type: USER_ERROR,
          payload: 'Error fetching chats',
        });
      }
    },
    storeMessage: async (msg) => {
      try {
        const res = await axios.post('/conversation/message', msg);

        const data = res.data;
        dispatch({ type: MESSAGE_SENT, payload: data });
      } catch (err) {
        dispatch({
          type: USER_ERROR,
          payload: 'Error sending message',
        });
      }
    },
    messagesRead: async (conversationId) => {
      try {
        const res = await axios.put(`/conversation/read/${conversationId}`);
        const data = res.data;
        const readMessages = data.messages;
        dispatch({ type: UPDATE_MESSAGES, payload: readMessages });
        if (res.status !== 200)
          dispatch({
            type: USER_ERROR,
            payload: 'Error updating messages',
          });
      } catch (err) {
        dispatch({
          type: USER_ERROR,
          payload: 'Error updating messages',
        });
      }
    },
    toggleTranslation: (bool) => {
      dispatch({ type: TOGGLE_TRANSLATION, payload: bool });
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
    appMobileMode: () => {
      dispatch({ type: MOBILE_MODE, payload: true });
    },
    appBigScreenMode: () => {
      dispatch({ type: MOBILE_MODE, payload: false });
    },
    appChatView: () => {
      dispatch({ type: CHANGE_USER_VIEW, payload: true });
    },
    appSideBarView: () => {
      dispatch({ type: CHANGE_USER_VIEW, payload: false });
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
    if (userState.user.name) {
      socket.on('connect', () => {
        console.log('Connected, assigned:', socket.id, socket.connected);
      });
    }

    socket.on('messageToClient', (msg) => {
      console.log('msg in action:', msg);
      dispatch({ type: 'MESSAGE_SENT', payload: msg });
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

  console.log('userState:', userState);

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
