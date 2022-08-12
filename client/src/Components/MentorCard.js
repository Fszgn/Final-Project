import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import greenPic from "../assets/green future.png";
import {
  LocationOn,
  Send,
  Badge,
  CoPresent,
} from "@mui/icons-material";

const MentorCard = ({
  el,
  detailedUser,
  setdetailedUser,
  setshowDetailedCard,
}) => {


  const handleClick = (event) => {
    event.preventDefault();
    fetch(`/findEachUser/${el._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setdetailedUser(data.body);
        setshowDetailedCard(true);
      });
  };
  return (
    <Container>
      <MentorCardDiv onClick={handleClick}>
        <ProfileImg src={el.picture}></ProfileImg>

        <InfoContainer>
          <ul>
            {" "}
            <h1> Info</h1>
            <LI>
              <CoPresent />
              <p style={{ marginLeft: "15px" }}>
                {el.firstName} {el.lastName}
              </p>
            </LI>
            <LI>
              <LocationOn />
              <p style={{ marginLeft: "15px" }}>{el.city}</p>
            </LI>
            <LI>
              <Send />
              <p style={{ marginLeft: "15px" }}>{el.email}</p>
            </LI>
            <LI>
              <Badge />
              {el.mentroship.map((el) => (
                <p style={{ marginLeft: "15px" }}>{el}</p>
              ))}
            </LI>
          </ul>
        </InfoContainer>
        <ActivityInfo>
          {" "}
          <ul>
            {" "}
            <h1> Mentorship</h1>
            <LI>{el.mentroship[0]}</LI>
            <LI>{el.mentroship[1]}</LI>
            <LI>{el.mentroship[2]}</LI>
          </ul>
        </ActivityInfo>
        {el.isGreen ? (
          <IsGreen>
            <GreenImg src={greenPic}></GreenImg>
          </IsGreen>
        ) : (
          <div style={{ width: "30px", height: "50px" }}></div>
        )}
      </MentorCardDiv>
    </Container>
  );
};

const GreenImg = styled.img`
  border-radius: 100px;
  height: 45px;
`;

const IsGreen = styled.div``;
const LI = styled.li`
  list-style: none;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ActivityInfo = styled.div``;
const InfoContainer = styled.div``;
const ProfileImg = styled.img`
  border-radius: 10px;
  height: 95px;
  width: 95px;
`;
const MentorCardDiv = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  border: 1px solid transparent;
  box-shadow: 0px 14px 32px -6px rgba(66, 66, 66, 0.8);
  margin-top: 10px;
  border-radius: 10px;
  padding: 50px;
`;
const Container = styled.div`
margin-top: 2%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default MentorCard;
