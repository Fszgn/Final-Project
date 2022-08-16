import { createContext, useEffect, useReducer } from "react";

export const UsersDataContext = createContext(null);

// Initial reducer state to store User Information
const initialState = {
  signedMentor: null,
  signedStudent: null,
  loadStatus: false,
  direcMessageContainer: false,
  direcMessageTo:null,
};

// Switch Cases
const reducer = (state, action) => {
  switch (action.type) {
    case "login-Student-data":
      return {
        ...state,
        signedMentor: null,
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
    case "direct-message-open":
      return {
        ...state,
        direcMessageContainer: true,
      };
    case "direct-message-close":
      return {
        ...state,
        direcMessageContainer: false,
      };
    case "direct-message-Info":
      return {
        ...state,
        direcMessageTo: action.data.el,
      };
    case "logout-user":
      return {
        ...state,
        signedMentor: null,
        signedStudent: null,
        loadStatus: false,
        direcMessageContainer: false,
      };
    default:
  }
};

export const UserDataProvider = ({ children }) => {
   const [userState, dispatchEvent] = useReducer(reducer, initialState);

  const LogStudentIn = (data) => {
          console.log(data);

        dispatchEvent({
          type: "login-Student-data",
          data,
        });
  }
  const LogMentorIn = (data) => {
    console.log(data)
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

  const directMessageOpen = (data) => {
    console.log("directMessageOpen");
      dispatchEvent({
        type: "direct-message-open",
      });
    };
   const directMessageClose = (data) => {
      dispatchEvent({
        type: "direct-message-close",
      });
  };
   const directTo = (data) => {
      dispatchEvent({
        type: "direct-message-Info",
        data,
      });
  };
  
  
  
  
  
  
  return (
    <UsersDataContext.Provider
      value={{
        userState,
        LogStudentIn,
        LogMentorIn,
        LogUserOut,
        directMessageOpen,
        directMessageClose,
        directTo,
      }}
    >
      {children}
    </UsersDataContext.Provider>
  );
};


 export default UserDataProvider;