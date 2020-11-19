export const UPDATE_USER = 'UPDATE_USER';
export const USER_ERROR = 'USER_ERROR';

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      return { ...state, user: payload };
    case USER_ERROR:
      return { ...state, user: { name: '' } };
    default:
      return state;
  }
};
