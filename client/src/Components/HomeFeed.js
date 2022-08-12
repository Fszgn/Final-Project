import { useEffect, useState } from "react";
import styled from "styled-components";
import About from "./About";
import DetailedCard from "./DetailedCard";
import MentorCard from "./MentorCard";

const HomeFeed = () => {
  //index for rendering mentorList
  const [indexList, setIndexList] = useState(0);

  //state triggers fetches
  const [trigger, settrigger] = useState(false);
  //state saves user locations coordinates
  const [loc, setLoc] = useState(null);
  //state saves MenstorList
  const [mentorList, setmentorList] = useState(null);
  //state detailed USer Info
  const [detailedUser, setdetailedUser] = useState(false);
  //state open/close detailedUserCard
  const [showDetailedCard, setshowDetailedCard] = useState(false);
  //func gets user location's coord's

  const handleNext = () => {
    if (mentorList !== null) {
      if (indexList + 10 > mentorList.length) {
        setIndexList(mentorList.length - 10);
        settrigger(!trigger);
        return;
      }
      settrigger(!trigger);
      setIndexList(indexList + 10);
      console.log(indexList);
    }
  };
  const handlePrev = () => {
    if (mentorList !== null) {
      if (indexList - 10 < 0) {
        setIndexList(0);
        settrigger(!trigger);
        return;
      }
      settrigger(!trigger);
      setIndexList(indexList - 10);
      console.log(indexList);
    }
  };
  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        if (location) {
          console.log(location.coords);
          setLoc(location.coords);
        }
      });
    }
  }, []);

  // get current cuty info by using coordinates
  // useEffect(() => {
  //   if (loc) {
  //     fetch(`/fetchCity`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data.body);
  //       });
  //   }
  // }, [loc]);

  useEffect(() => {
    fetch(`/getTheMentors`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.body);
        setmentorList(data.body);
      });
  }, [trigger]);

  return (
    <Container>
      {" "}
      {showDetailedCard && (
        <DetailedCard
          setshowDetailedCard={setshowDetailedCard}
          user={detailedUser}
        />
      )}
      <About />
      {mentorList ? (
        mentorList.slice(indexList, indexList + 10).map((el) => {
          return (
            <MentorCard
              setshowDetailedCard={setshowDetailedCard}
              detailedUser={detailedUser}
              setdetailedUser={setdetailedUser}
              el={el}
            />
          );
        })
      ) : (
        <p>loading</p>
      )}{" "}
      <NextPrev>
        <NextButton onClick={handlePrev}>Previous</NextButton>
        <NextButton onClick={handleNext}>Next</NextButton>
      </NextPrev>
    </Container>
  );
};
//===================================
//      user.filter((el)=>{el.firstName.toLowerCase().includes("somet")}).map(el=>{return el.firstName})
const NextButton = styled.button`
  margin-bottom: 10px;
  border: 2px solid #1a1a1a;
  background-color: white;
  border-radius: 15px;
  color: #3b3b3b;
  box-shadow: 0px 14px 32px -6px rgba(66, 66, 66, 0.8);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  font-weight: 600;
  min-height: 60px;
  min-width: 170px;

  position: -webkit-sticky;
  position: sticky;
  top: 0;

  margin: 0 10px 0 10px;

  outline: none;
  padding: 12px 18px;
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
const NextPrev = styled.div`
  width: 80vw;
  height: 3vh;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 50px;
  margin-bottom: 150px;
`;
const Container = styled.div`
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default HomeFeed;
