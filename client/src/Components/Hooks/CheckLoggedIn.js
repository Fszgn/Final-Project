import GetCookie from "../Cookie/GetCookie";
import { useEffect, useState, useContext } from "react";
import { UsersDataContext } from "../Context/UsersContext";

const CheckLoggedIn = ({ trigger, settrigger }) => {
  // Context users redux 
  const allRedFunc = useContext(UsersDataContext);

  //If exists -> fetch the user data from the database
  useEffect(() => {
    // Checks if userUnique cookie exist
    const cookie = GetCookie("userUId");
    console.log(cookie);
    if (cookie !== undefined) {
      fetch(`/getTheUser`)
        .then((res) => res.json())
        .then((data) => {
          console.log("check lgin triggered");
          if (data.body.student !== null) {
            allRedFunc.LogStudentIn(data.body.student);
          } else if (data.body.mentor !== null) {
            allRedFunc.LogMentorIn(data.body.mentor);
          }
        });
      return;
    } else if (cookie === undefined) {
      console.log("no cookiesS");
    }
   
  }, [trigger]);
};

export default CheckLoggedIn;
