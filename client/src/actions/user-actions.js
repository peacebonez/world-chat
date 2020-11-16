// import axios from "axios";

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// //Should this also create an invite in the mongoDB?
// export const sendInvite = (userId, emailList) => async (dispatch) => {
//   try {
//     await axios.post(`/user/${userId}/invitation/send`, { emailList }, config);
//     dispatch({ type: "SEND_INVITE" });
//   } catch (err) {
//     console.error(err);
//   }
// };
