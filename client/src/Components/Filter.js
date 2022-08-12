import styled from "styled-components"
import {profesMentor,cityArray} from "../BatchImport/data/data"
const Filter = ({
  setSearchCourse,
  setSearchCity,
  setSearchName,
  searchName,
  settrigger,
  trigger,
}) => {

    
//   const handleChange = (event) => {
    
//   };

  return (
    <Container>
      Filter
      <input
        onChange={(ev) => {
          setSearchName(ev.target.value);
          settrigger(!trigger);
        }}
        type="text"
        placeholder="Search"
        value={searchName}
      />
      <select onChange={(ev) => {setSearchCity(ev.target.value);settrigger(!trigger);}}>
        {cityArray.map((el) => {
          return <option value={el}>{el}</option>;
        })}
      </select>
          <select onChange={(ev) => { setSearchCourse(ev.target.value); settrigger(!trigger);}}>
        {profesMentor.map((el) => {
          return <option value={el.toLowerCase()}> {el}</option>;
        })}
      </select>
    </Container>
  );
};


const Container = styled.div`
  width: 70%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

background-color: aqua;
`;

export default Filter