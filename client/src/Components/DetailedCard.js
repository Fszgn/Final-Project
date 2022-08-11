import styled from "styled-components";
import {
  Close,
  LocationOn,
  Send,
  Info,
  Badge,
  CoPresent,Twitter, LinkedIn, Facebook, KeyboardDoubleArrowRight,
} from "@mui/icons-material";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const socket = io.connect("http://localhost:8001");

const DetailedCard = ({ setshowDetailedCard, user }) => {
    const [messg, setmessg] = useState("");
    const [messgRC, setmessgRC] = useState("");
    const nav = useNavigate();
    
    const handleProfile = () => {
            nav(`/fullProfile/${user._id}`);
    };

    socket.on("connection", () => {
      console.log("first");
    });
    const sendMessage = (data) => {
        socket.emit("send_message", { message: messg });
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setmessgRC(data.message);
      })
    }, [socket])
    


  const handleClick = () => {
    setshowDetailedCard(false);
  };
  console.log(user);
  return (
    <Container>
      {user && (
        <Popup>
          <DetailBox>
            <CloseBtn>
              <Close style={{ marginRight: " 15px" }} onClick={handleClick} />
            </CloseBtn>
            <ProfilePic src={user.picture}></ProfilePic>

            <InfoCont>
              <ul>
                <LI>
                  <CoPresent />
                  <p style={{ marginLeft: "15px" }}>
                    {user.firstName} {user.lastName}
                  </p>
                </LI>
                <LI>
                  <LocationOn />
                  <p style={{ marginLeft: "15px" }}>{user.city}</p>
                </LI>
                <LI onClick={() => (window.location = `mailto:${user.email}`)}>
                  <Send />
                  <p
                    onClick={() => (window.location = `mailto:${user.email}`)}
                    style={{ marginLeft: "15px" }}
                  >
                    {user.email}
                  </p>
                </LI>
                <LI>
                  <Badge />
                  {user.mentroship.map((el) => (
                    <P style={{ marginLeft: "15px" }}>{el},</P>
                  ))}
                </LI>
              </ul>
              <Paragraph>
                <Info />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ac porta ante. Suspendisse risus felis, ornare a pretium
                pulvinar, luctus nec orci. Vivamus malesuada nisl quis urna
                mattis, ut ornare urna fermentum.
              </Paragraph>
            </InfoCont>
            <ButtonContainer>
              <div>
                <Twitter
                  style={{
                    color: "#1976d2",
                    fontSize: "55px",
                    marginLeft: "25px",
                  }}
                />
                <LinkedIn
                  style={{
                    color: "#1976d2",
                    fontSize: "55px",
                    marginLeft: "25px",
                  }}
                />
                <Facebook
                  style={{
                    color: "#1976d2",
                    fontSize: "55px",
                    marginLeft: "25px",
                  }}
                />
              </div>
              <FullPage onClick={handleProfile}>
                <p>Full Profile</p>
                <KeyboardDoubleArrowRight
                  style={{
                    color: "#1976d2",
                    fontSize: "55px",
                    marginLeft: "-5px",
                  }}
                />
              </FullPage>
            </ButtonContainer>
            {/* <Review>
              <Title>Reviews</Title>
                          <Reviews></Reviews>
                          <h1>message received: { messgRC}</h1>
              <ReviewBtn>Write a review</ReviewBtn>
                          <input onChange={(event) => {
                              setmessg(event.target.value);
              }} placeholder="Mesage..." />
              <button onClick={sendMessage}>send message</button>
            </Review> */}
          </DetailBox>
        </Popup>
      )}
    </Container>
  );
};


const FullPage = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: none;
  background-color: transparent;
  border-radius: 7px;
  color: #1976d2;
  padding-left: 5px;
  > p {
    font-size: 25px;
    font-weight: 500;
  }
  &:hover {
    transition-property: all;
    transition-duration: 300ms;
    transform: translate(0, -2px);
    background-color: #3b3b3b;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  top: 5%;
  left: 5%;
  width: 90%;
  height: 25%;
  z-index: 2;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between
`; 

const ReviewBtn = styled.button`
  margin-bottom: 10px;
  border: 2px solid #1a1a1a;
  background-color: transparent;
  border-radius: 15px;
  color: #3b3b3b;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  min-height: 60px;

  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  &:hover {
    transition-property: all;
    transition-duration: 300ms;
    transform: translate(0, -2px);
    background-color: #3b3b3b;
    color: white;
  }
`;
const Reviews = styled.div``
const Title = styled.h1`
color:black`;
const Review = styled.div`
  top: -5%;
  left: 5%;
  width: 90%;
  height: 40%;
  z-index: 2;
  position: relative;
  background-color: aqua;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

`;
const P = styled.p`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LI = styled.li`

  list-style: none;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const InfoCont = styled.div`
  position: relative;
  left: 30%;

  width: 60%;
  height: 50%;
`;
const Paragraph = styled.p`
  position: relative;
  margin-top: 20px;
`;

const ProfilePic = styled.img`
  width: 250px;
  margin-left: 40px;
  border-radius: 200px;
  box-shadow: 3px 3px 3px;
  z-index: 0;
  position: absolute;
`;
const CloseBtn = styled.div`
  margin-top: 15px;
  margin-right: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  z-index: 2;

  > :hover {
    margin: 3px;
    border: 1px solid pink;
  }
`;

const DetailBox = styled.div`
  height: 70vh;
  width: 70vw;
  position: fixed;
  top: 10%;
  left: 15%;
  z-index: 2;
  background-color: white;

  border-radius: 20px;
`;

const Popup = styled.div`
  margin: 0;

  background-color: white;
  color: black;
  position: fixed;
  top: 0%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.6);

  height: 100vh;
  width: 100vw;

  position: "fixed";
`;
const Container = styled.div`
  margin: 0;
  position: "relative";
  z-index: 2;

  width: 100%;
  height: 100%;
`;

export default DetailedCard;
