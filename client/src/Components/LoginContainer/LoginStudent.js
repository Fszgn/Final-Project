import { useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import SetCookie from "../Cookie/SetCookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UsersDataContext } from "../Context/UsersContext";

const LoginStudent = ({ trigger, settrigger }) => {
  //user context
  const allRedFunc = useContext(UsersDataContext);
  // Store the user information
  const [student, setStudent] = useState(null);
  //navigator
  const nav = useNavigate();

  // update state based on the token from OAuth
  const handleCallbackResponse = async (response) => {
    const userObj = await jwt_decode(response.credential);
    // Save in State the user info from OAUTH
    setStudent(userObj);
    settrigger(!trigger);

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

  // Post users data in Mongodb
  useEffect(() => {
    if (student !== null) {
      // console.log(student.email);
      fetch(`/studentLogIn`, {
        method: "POST",
        body: JSON.stringify({
          student,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          allRedFunc.LogMentorIn(student);
          // console.log(student);
          nav("/");
        });
    }
  }, [student]);

  return (
    <Wrapper>
      <Container>
        <Title>Login via Google</Title>
        <div id="signInDiv"></div>
        <form></form>
      </Container>
    </Wrapper>
  );
};

const Title = styled.h1`
  margin-bottom: 15px;
`;

const Container = styled.div`
  width: 50vw;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border: 2px solid #1a1a1a;
  background-color: transparent;
  border-radius: 15px;
  color: #016340;
  background-color: rgba(66, 66, 66, 0.4);

  border: 2px solid rgba(66, 66, 66, 0.2);

  box-shadow: 0px 14px 32px -6px rgba(66, 66, 66, 0.8);

  backdrop-filter: blur(5px);
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 10%;
`;

export default LoginStudent;
