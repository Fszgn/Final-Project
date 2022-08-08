import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const LoginMentor = () => {
  const [mentor, setMentor] = useState(null);

  // update state based on the token from OAuth
  const handleCallbackResponse = async (response) => {
    const userObj = await jwt_decode(response.credential);
    console.log(userObj);
    await setMentor(userObj);
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
    if (mentor !== null) {
      console.log(mentor.email);
      fetch(`/mentorLogIn`, {
        method: "POST",
        body: JSON.stringify({
          mentor,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [mentor]);

  return (
    <div>
      Mentor Login
      <div id="signInDiv"></div>
    </div>
  );
};

export default LoginMentor;
