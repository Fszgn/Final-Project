import { createContext, useEffect, useState } from "react";

export const UsersDataContext = createContext(null);


const UsersDataProvider = ({ children }) => {

        useEffect(() => {
          fetch(`/getItems`)
            .then((res) => res.json())
              .then((data) => {
                console.log("Get Users")
            });
        }, []);


  return (
    <UsersDataContext.Provider
      value={{
        
      }}
    >
      {children}
    </UsersDataContext.Provider>
  );
};

export default UsersDataProvider;
