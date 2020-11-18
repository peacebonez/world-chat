import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const initialState = {
  email: '',
  contacts: [],
  primaryLanguage: '',
  loading: true,
  error: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SEND_INVITE':
      console.log('SENDING INVITE!');
      return state;
    default:
      return state;
  }
}
