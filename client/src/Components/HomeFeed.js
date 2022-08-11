import { useEffect , useState} from "react";
import styled from "styled-components";
import About from "./About";
import DetailedCard from "./DetailedCard";
import MentorCard from "./MentorCard";


const HomeFeed = () => {
  //state saves user locations coordinates
  const [loc, setLoc] = useState(null)
  const [mentorList, setmentorList] = useState(null);
  //state detailed USer Info
  const [detailedUser, setdetailedUser] = useState(false);
  //state open/close detailedUserCard
  const [showDetailedCard, setshowDetailedCard] = useState(false);
  //func gets user location's coord's
  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        if (location) {
          console.log(location.coords);
          setLoc(location.coords)
        };
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
  },[]);
  
    return (
      <Container>
        {showDetailedCard && (
          <DetailedCard
            setshowDetailedCard={setshowDetailedCard}
            user={detailedUser}
          />
        )}
        <About />

        {mentorList ? (
          mentorList.map((el) => {
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
        )}
        {/* <DetailedCard /> */}
      </Container>
    );
}

const Container = styled.div`
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`


export default HomeFeed