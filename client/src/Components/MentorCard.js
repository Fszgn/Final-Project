import { useEffect, useState } from "react";
import styled from "styled-components";
import greenPic from "../assets/green future.png"



const MentorCard = ({ el }) => {
  return (
    <Container>
      <MentorCardDiv>
        <ProfileImg src={el.picture}></ProfileImg>

        <InfoContainer>
          <ul>
            <LI>{el.email}</LI>
            <LI>{el.firstName}</LI>
            <LI>{el.city}</LI>
          </ul>
        </InfoContainer>
        <ActivityInfo>
          {" "}
          <ul>
            <LI>{el.mentroship[0]}</LI>
            <LI>{el.mentroship[1]}</LI>
            <LI>{el.mentroship[2]}</LI>
          </ul>
        </ActivityInfo>
        {el.isGreen ? (
          <IsGreen>
            <GreenImg src={greenPic}></GreenImg>
          </IsGreen>
        ) : null}
      </MentorCardDiv>
    </Container>
  );
};

const GreenImg = styled.img`
    border-radius: 100px;
    height: 45px;
`;

const IsGreen = styled.div`
`;
const LI = styled.li`
  list-style: none;
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

  border: 1px solid;
  margin-top: 10px;
  border-radius: 10px;
  padding: 70px;
`;
const Container = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default MentorCard;
