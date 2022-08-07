import { createContext, useEffect, useReducer } from "react";

export const UsersDataContext = createContext(null);

// Initial reducer state to store User Information
const initialState = {
  signedUser: null,
  loadStatus: false,
};

// Switch Cases
const reducer = (state, action) => {
  switch (action.type) {
    case "login-user-data":
      return {
        ...state,
        signedUser: action.data,
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

    const UserLogin = (data) => {
        dispatchEvent({
            type: "login-user-data",
            data,
        });
    }
    const UserLogout = (data) => {
        dispatchEvent({
          type: "logout-user",
        });
    }
//   useEffect(() => {
//     fetch(`/getItems`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Get Users");
//       });
//   }, []);

  return (
    <UsersDataContext.Provider value={{ UserLogin, UserLogout }}>
      {children}
    </UsersDataContext.Provider>
  );
};


 export default UserDataProvider;