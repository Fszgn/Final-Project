import styled from "styled-components";
import { profesMentor, cityArray } from "../BatchImport/data/data";
import { FilterAlt } from "@mui/icons-material";

const Filter = ({
  setSearchCourse,
  setSearchCity,
  setSearchName,
  searchName,
  settrigger,
  trigger,
}) => {


  return (
    <Wrapper>
      <FilterTitle
        style={{
          color: " #1a1a1a",
          marginLeft: "25px",
          fontSize: "20px",
        }}
      >
        Filter <FilterAlt />
      </FilterTitle>
      <Container>
        <Div>
          {" "}
          <h1
            style={{ color: " #1a1a1a", marginRight: "5px", fontSize: "20px" }}
          >
            Name :{" "}
          </h1>
          <InputName
            onChange={(ev) => {
              setSearchName(ev.target.value);
              settrigger(!trigger);
            }}
            type="text"
            value={searchName}
          />{" "}
        </Div>
        <Div>
          <h1
            style={{ color: " #1a1a1a", marginRight: "5px", fontSize: "20px" }}
          >
            City :{" "}
          </h1>
          <Select
            onChange={(ev) => {
              setSearchCity(ev.target.value);
              settrigger(!trigger);
            }}
          >
            <option> Select City</option>;
            {cityArray.map((el, index) => {
              return (
                <option key={index} value={el}>
                  {el}
                </option>
              );
            })}
          </Select>
        </Div>
        <Div>
          {" "}
          <h1
            style={{ color: " #1a1a1a", marginRight: "5px", fontSize: "20px" }}
          >
            Course :{" "}
          </h1>
          <Select
            style={{ marginRight: "25px" }}
            onChange={(ev) => {
              setSearchCourse(ev.target.value);
              settrigger(!trigger);
            }}
          >
            {" "}
            <option id="default"> Select Course</option>;
            {profesMentor.map((el, index) => {
              return (
                <option key={index} value={el.toLowerCase()}>
                  {" "}
                  {el}
                </option>
              );
            })}
          </Select>
        </Div>
      </Container>
    </Wrapper>
  );
};

const FilterTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
 
const Div = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

`;
const Wrapper = styled.div`
  width: 85%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;


  border: 2px solid #1a1a1a;
  border-radius: 15px;
`;
const Select = styled.select`
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  background-color: transparent;
  color: #1a1a1a;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  font-weight: 600;
  min-height: 55px;

  outline: none;
  text-align: center;
  text-decoration: none;
`;

const InputName = styled.textarea`
  border: 2px solid #1a1a1a;
  background-color: transparent;
  border-radius: 15px;
  color: #1a1a1a;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 55px;
  font-size: 20px;
  font-weight: 600;
  margin-left: 25px;

  outline: none;
  text-align: center;
  text-decoration: none;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  background-color: transparent;
  color: #1a1a1a;
`;

export default Filter;
