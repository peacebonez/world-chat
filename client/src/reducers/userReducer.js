export const UPDATE_USER = 'UPDATE_USER';
export const USER_ERROR = 'USER_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      return { ...state, user: payload };
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
    case USER_ERROR:
      return { ...state, user: payload };
    case CLEAR_ERRORS:
      return { ...state, user: { errorMsg: '' } };
    default:
      return state;
  }
};
