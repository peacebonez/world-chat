export const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
