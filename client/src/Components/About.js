import styled from "styled-components";
import aboutBackground from "../assets/aboutBackground.png";

const About = () => {
  return (
    <Container>
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <ImgBack src={aboutBackground}></ImgBack>
        <AboutParagCont>
          <AboutParag style={{ fontSize: "23px" }}>
            <p style={{ color: "white" }}>Our Mission</p>
            This website aims to match mentors and students on variety of
            topics. Whenever the MENTOR have the special icon on his Card, it
            represents that the student will have the oppurtunity to have the
            "GREEN MENTORSHIP" experience.{" "}
          </AboutParag>
          <div style={{ width: "30px", height: "30px" }}></div>
          <AboutParag style={{ fontSize: "23px" }}>
                      "GREEN MENTORSHIP" offers unique scientific experiments to raise AWARENESS on GLOBAL ISSUES.{" "}
                      
          </AboutParag>
          <div style={{ width: "30px", height: "20px" }}></div>
          <AboutParag style={{ fontSize: "14px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
            porta ante. Suspendisse risus felis, ornare a pretium pulvinar,
            luctus nec orci. Vivamus malesuada nisl quis urna mattis, ut ornare
            urna fermentum. Nullam consectetur mollis sem. In vestibulum gravida
            laoreet. Curabitur blandit tincidunt risus, in blandit nulla mattis
            eu. Donec sed euismod purus, sit amet aliquam urna. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos.
          </AboutParag>
        </AboutParagCont>
      </div>
    </Container>
  );
};



const ImgBack = styled.img`
  width: 100%;
  height: 100%;

  z-index: 0;
`;
const AboutParagCont = styled.div`
  width: 80vw;
  height: 80vh;
  z-index: 1;
  color: white;
  position: absolute;
  top: 0%;

  background-color: rgba(21, 0, 44, 0.27);

  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const AboutParag = styled.div`
  color: white;
  width: 40vw;


  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Container = styled.div`
  width: 80vw;
  height: 80vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 30px 0 30px 0;
`;
export default About;
