import styled from "styled-components";
import { NavLink } from "react-router-dom";

const LoginContainer = () => {
  return (
    <Container>
      <StudentButton to="/LoginStudent">Student</StudentButton>
      <MentorButton to="/LoginMentor">Mentor</MentorButton>
    </Container>
  );
};

const StudentButton = styled(NavLink)`
  margin-left: 40px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  :hover {
    background-color: black;
    color: var(--color-navbar-beige);
  }
`;
const MentorButton = styled(NavLink)`
  margin-left: 40px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  :hover {
    background-color: black;
    color: var(--color-navbar-beige);
  }
`;
const Container = styled.div`
  width: 100vw;
  height: 200px;

`;

export default LoginContainer;
