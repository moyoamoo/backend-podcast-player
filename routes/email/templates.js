
const welcomeEmail = (email) => {
  return {
    subject: `Account Created`,
    content: `<div>
                  <h1>Welcome ${email} to LaunchPod</h1>
                  <p>Thank you for signing up!</p>
              </div>`,
  };
};

const deleteAccount = (email) => {
  return {
    subject: `Account deleted`,
    content: `<div>
                  <h1>Sorry to see you leave, LaunchPod ${email}</h1>
                  <p>Your account is deleted!</p>
              </div>`,
  };
};

// const confirmEmailChange = (email) => {
//   return {
//     subject: `Email Change`,
//     content: `<div>
//                   <h1>A request to change email has been made to your account${email}</h1>
//                   <p>Would you like to accept the change</p>
//               </div>`,
//   };
// };



module.exports = { welcomeEmail, deleteAccount};
