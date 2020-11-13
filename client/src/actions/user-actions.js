import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createInvite = async (userId, emailList) => {
  try {
    const res = await axios.post(
      `/user/${userId}/invitation`,
      { emailList },
      config
    );

    const emails = res.data;
    //placeholder alert
    alert("Success!");
    return emails;
  } catch (err) {
    console.error(err);
  }
};

//Should this also create an invite in the mongoDB?
export const sendInvite = async (userId, emailList) => {
  try {
    const res = await axios.post(
      `/user/${userId}/invitation/send`,
      { emailList },
      config
    );

    const emails = res.data;
    //placeholder alert
    alert("Success!");
    return emails;
  } catch (err) {
    console.error(err);
  }
};
