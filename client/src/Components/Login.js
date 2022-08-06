import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
const Login = () => {
    const handleCallbackResponse = ((response) => {
        // console.log("Encode JWT ID token: " + response.credential);
        const userObj = jwt_decode(response.credential);
        console.log(userObj);
  });

    // GOOGLE ACCOUNT LOGIN API
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "788173478119-hbk0gb6srd9o6ej65cg9e4i5v2fpddud.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
      
      google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          {theme:"outline", size:"large"}
      )
  }, []);

    return (
      <div>
        Login
        <div id="signInDiv"></div>
      </div>
    );
};

export default Login;
