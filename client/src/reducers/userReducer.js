export const UPDATE_USER = 'UPDATE_USER';
export const USER_ERROR = 'USER_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const SWITCH_CONVERSATION = 'SWITCH_CONVERSATION';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const ADD_CONVERSATION = 'ADD_CONVERSATION';

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      return { ...state, user: payload };
    case GET_CONVERSATIONS:
      return { ...state, user: { ...state.user, conversations: payload } };
    case USER_LOGOUT:
      return {
        user: {
          name: '',
          email: '',
          avatar: '',
          contacts: [],
          primaryLanguage: '',
        },
      };
    case ADD_CONVERSATION:
      return {
        ...state,
        user: {
          ...state.user,
          conversations: { ...state.user.conversations, payload },
        },
      };
    case SWITCH_CONVERSATION:
      return { ...state, user: { ...state.user, activeRoom: payload } };
    case USER_ERROR:
      return { ...state, errorMsg: payload };
    case CLEAR_ERRORS:
      return { ...state, errorMsg: '' };
    default:
      return state;
  }
};
