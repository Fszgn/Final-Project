import { createContext, useEffect, useReducer } from "react";

export const UsersDataContext = createContext(null);

// Initial reducer state to store User Information
const initialState = {
  signedMentor:null,
  signedStudent: null,
  loadStatus: false,
};

// Switch Cases
const reducer = (state, action) => {
  switch (action.type) {
    case "login-Student-data":
      return {
        ...state,
        signedMentor:null,
        signedStudent: action.data,
        loadStatus: true,
      };
    case "login-Mentor-data":
      return {
        ...state,
        signedStudent: null,
        signedMentor: action.data,
        loadStatus: true,
      };
      case "logout-user":
          return {
            ...state,
            signedUser: null,
          };
      default:
  }
};

export const UserDataProvider = ({ children }) => {
   const [userState, dispatchEvent] = useReducer(reducer, initialState);

    const LogStudentIn = (data) => {
        dispatchEvent({
          type: "login-Student-data",
          data,
        });
  }
  const LogMentorIn = (data) => {
        dispatchEvent({
          type: "login-Mentor-data",
          data,
        });
    }
    const LogUserOut = (data) => {
      dispatchEvent({
        type: "logout-user",
      });
    };


  return (
    <UsersDataContext.Provider
      value={{ userState, LogStudentIn, LogMentorIn, LogUserOut }}
    >
      {children}
    </UsersDataContext.Provider>
  );
};


 export default UserDataProvider;