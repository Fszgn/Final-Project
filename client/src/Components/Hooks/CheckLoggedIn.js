import GetCookie from "../Cookie/GetCookie";
import { useEffect, useState, useContext } from "react";
import { UsersDataContext } from "../../Context/UsersContext";

const CheckLoggedIn = () => {
  const allRedFunc = useContext(UsersDataContext);

  // Checks if userUnique cookie exist
  const cookie = GetCookie("userUId");

  //If exists -> fetch the user data
  useEffect(() => {
    if (cookie !== null) {
      console.log("there is a cookie");
      fetch(`/getTheUser`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.body.student !== null) {
            allRedFunc.LogStudentIn(data.body.student);
          } else if (data.body.mentor) {
            allRedFunc.LogMentorIn(data.body.mentor);
          }
        });
    }
  }, []);
};

export default CheckLoggedIn;
