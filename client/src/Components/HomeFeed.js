import { useEffect , useState} from "react";
import styled from "styled-components";
import MentorCard from "./MentorCard";

const HomeFeed = () => {
    const [mentorList, setmentorList] = useState(null);

  
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
        HomeFeed
        {mentorList ? mentorList.map(el => {
          return (
            <MentorCard el = {el} />
          );
        }):(<p>loading</p>)}
        <div>smtng</div>
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