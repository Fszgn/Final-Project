import { useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import SetCookie from "../Cookie/SetCookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { cityArray, profesMentor } from "../../BatchImport/data/data";
import { Select } from "@mui/material";
import { CleaningServices } from "@mui/icons-material";
import greenPic from "../../assets/green future.png";
import { UsersDataContext } from "../Context/UsersContext";
const LoginMentor = ({ trigger, settrigger }) => {
  //user context
  const allRedFunc = useContext(UsersDataContext);
  //state for recording the City selection
  const [city, setCity] = useState("Montreal");
  //state for recording the City selection
  const [course, setCourse] = useState([]);
  // Store the user information
  const [mentor, setMentor] = useState({});
  //state for recording the Count selection
  const [counter, setCounter] = useState(0);

  // GEt user Location NOT DONE ==========================
  // useEffect(() => {
  //   if (navigator?.geolocation) {
  //     navigator.geolocation.getCurrentPosition((location) => {
  //       if (location) {
  //         setLoc(location.coords);
  //       }
  //     });
  //   }
  // }, []);

  // update state based on the token from OAuth
  const handleCallbackResponse = async (response) => {
    const Obj = await jwt_decode(response.credential);
    setMentor({
      ...mentor,
      _id: Obj.sub,
      email: Obj.email,
      firstName: Obj.given_name,
      lastName: Obj.family_name,
      city: city,
      country: "Canada",
      picture: "../../assets/green future.png",
      isGreen: true,
      mentroship: [...course],
    });
    settrigger(!trigger);
    //setCookie -> id from OAuth
    SetCookie("userUId", Obj.sub);
    if (course.length > 0) {
    }
  };

  //login As a Mentor
  const logInMentor = () => {
    settrigger(!trigger);

    fetch(`/mentorLogIn`, {
      method: "POST",
      body: JSON.stringify({
        mentor,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        allRedFunc.LogMentorIn(mentor);
        console.log(mentor)
      });
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

  //handle Course selection
  const handleCourse = (ev) => {
    if (ev.target.checked && counter === 3) {
      ev.target.checked = false;
      window.alert("You have reached the max number of selection.");
    } else if (ev.target.checked && counter < 3) {
      console.log("checked");
      setCounter(counter + 1);
      setCourse([...course, ev.target.value]);
    } else if (!ev.target.checked) {
      const name = ev.target.value;
      console.log("UNchecked");
      setCounter(counter - 1);
      setCourse(course.filter((el) => el !== name));
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>Login with Google</Title>
        <Form>
          <Sect>
            <h1 style={{ marginBottom: "20px" }}>Select max 3</h1>
            {profesMentor.map((el) => {
              return (
                <SelectSec
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <label style={{ marginRight: "5px" }} for={el}>
                    {el}
                  </label>
                  <input
                    onClick={handleCourse}
                    type="checkbox"
                    id={el}
                    name={el}
                    value={el}
                  ></input>
                </SelectSec>
              );
            })}
          </Sect>
          <Sect>
            <h1 style={{ marginBottom: "20px" }}>Select City</h1>
            <select
              required
              onChange={(ev) => {
                setCity(ev.target.value);
              }}
            >
              {cityArray.map((el, index) => {
                return (
                  <option key={index} value={el}>
                    {" "}
                    {el}
                  </option>
                );
              })}
            </select>
          </Sect>
        </Form>
        <div
          style={{ marginBottom: "30px", borderRadius: "25px" }}
          id="signInDiv"
        ></div>{" "}
        <button onClick={logInMentor}>triigg</button>
      </Container>
    </Wrapper>
  );
};

const Sect = styled.div`
  margin: 35px 10px 35px 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  border: 2px solid rgba(66, 66, 66, 0.2);
  padding: 20px;
`;

const SelectSec = styled.div`
  margin-top: 5px;
  appearance: none;
  padding: 0 1em 0 0;
  font-family: inherit;
  font-size: inherit;
`;
const Title = styled.h1`
  margin-bottom: 15px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: row;
  padding: 20px;
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
export default LoginMentor;
