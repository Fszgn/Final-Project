import GetCookie from "../Cookie/GetCookie";
import { useEffect, useContext } from "react";
import { UsersDataContext } from "../Context/UsersContext";

const CheckLoggedIn = ({ trigger }) => {
  // Context users redux
  const allRedFunc = useContext(UsersDataContext);

  //If exists -> fetch the user data from the database
  useEffect(() => {
    // Checks if userUnique cookie exist
    const cookie = GetCookie("userUId");
    console.log(cookie);
    if (cookie !== undefined) {
      fetch(`https://mentormatchingapp-finalpro.herokuapp.com/getTheUser`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.body.student && data.body.mentor) {
            allRedFunc.LogStudentIn(data.body.student);
            return;
          } else if (data.body.student !== null) {
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
