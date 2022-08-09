import styled from "styled-components";

const DetailedCard = ({ setshowDetailedCard, detailedUser }) => {
  const handleClick = () => {
    setshowDetailedCard(false);
  };

  return (
    <Container>
      <Popup>
        <DetailBox>
          <CloseBtn onClick={handleClick}>X</CloseBtn>
        </DetailBox>
      </Popup>
    </Container>
  );
};
const CloseBtn = styled.button`
  margin-top: 15px;
  margin-left: 15px;
  width: 25px;
`;

const DetailBox = styled.div`
  height: 80vh;
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
  color: white;
  position: fixed;
  top: 0%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.6);

  height: 100vh;
  width: 100vw;
`;
const Container = styled.div`
  margin: 0;
  position: "relative";
  z-index: 2;

  width: 100%;
  height: 100%;
`;

export default DetailedCard;
