import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//Should this also create an invite in the mongoDB?
export const sendInvite = async (userId, emailList) => {
  try {
    await axios.post(`/user/${userId}/invitation/send`, { emailList }, config);
  } catch (err) {
    console.error(err);
  }
};
