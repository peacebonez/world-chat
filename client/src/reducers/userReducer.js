import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const initialState = {
  email: "",
  contacts: [],
  primaryLanguage: "",
  loading: true,
  error: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SEND_INVITE":
      console.log("SENDING INVITE!");
      return state;
    default:
      return state;
  }
}

export const sendInvite = (userId, emailList) => async (dispatch) => {
  try {
    await axios.post(`/user/${userId}/invitation/send`, { emailList }, config);
    dispatch({ type: "SEND_INVITE" });
  } catch (err) {
    console.error(err);
  }
};
export const createInvite = (userId, emailList) => async (dispatch) => {
  try {
    await axios.post(`/user/${userId}/invitation`, { emailList }, config);

    dispatch({ type: "CREATE_INVITE" });
  } catch (err) {
    console.error(err);
  }
};
