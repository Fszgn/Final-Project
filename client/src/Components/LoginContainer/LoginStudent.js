import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import SetCookie from "../Cookie/SetCookie";
import GetCookie from "../Cookie/GetCookie";
const LoginStudent = () => {
  // Store the user information
  const [student, setStudent] = useState(null);


  // update state based on the token from OAuth
  const handleCallbackResponse = async (response) => {
    const userObj = await jwt_decode(response.credential);
    // console.log(userObj);
    await setStudent(userObj);
    //setCookie -> id from OAuth
    SetCookie("userUId", userObj.sub);
  };

  // GOOGLE ACCOUNT LOGIN API
  //need to update userContext and post some data to Mongo through Backend !!!
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "788173478119-hbk0gb6srd9o6ej65cg9e4i5v2fpddud.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  // calls endpoint for posting users data
  useEffect(() => {
    if (student !== null) {
      console.log(student.email);
      fetch(`/studentLogIn`, {
        method: "POST",
        body: JSON.stringify({
          student,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [student]);

  return (
    <div>
      Student Login
      <div id="signInDiv"></div>
    </div>
  );
};

export default LoginStudent;