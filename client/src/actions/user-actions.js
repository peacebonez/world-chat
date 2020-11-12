import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createInvite = async (userId, emailList, userEmail) => {
  try {
    await axios.post(`/user/${userId}/invitation`, { emailList }, config);
  } catch (err) {
    console.error(err);
  }
};
