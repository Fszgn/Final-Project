import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import greenPic from "../assets/green future.png";
import { LocationOn, Send, Badge, CoPresent } from "@mui/icons-material";

const ProfilePage = () => {
  let userId = useParams();
  const [el, setEl] = useState(null)



  if (userId.id) {
    console.log(userId.id.length)
        fetch(`/findEachUser/${userId.id}`)
          .then((res) => res.json())
          .then((data) => {
            setEl(data.body);
          });
  }

  
  return (
    <Container>
      {el?(<MentorCardDiv >
        <ProfileImg src={el.picture}></ProfileImg>

        <InfoContainer>
          <ul>
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
      </MentorCardDiv>):(null)}
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
  width: 70vw;
  min-height: 55vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  border: 1px solid;
  border-radius: 10px;

  margin-top: 10px;
  padding: 50px;
`;
const Container = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;

export default ProfilePage;