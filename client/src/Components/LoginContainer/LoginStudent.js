import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const LoginStudent = () => {
  // Store the user information
  const [student, setStudent] = useState(null);

  const handleCallbackResponse = async (response) => {
    const userObj = await jwt_decode(response.credential);
    console.log(userObj);
    await setStudent(userObj);
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

  useEffect(() => {
    if (student !== null) {
      console.log(student.email)
      fetch(`/studentLogIn`, {
        method: "POST",
        body: JSON.stringify({
         student
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
