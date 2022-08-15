import styled from "styled-components";
import { NavLink } from "react-router-dom";
import GetCookie from "../Cookie/GetCookie";

const LoginContainer = () => {

  return (
    <Container>
      <Btn to="/LoginStudent">Student</Btn>
      <Btn to="/LoginMentor">Mentor</Btn>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = styled(NavLink)`
  margin-bottom: 10px;
  border: 2px solid #1a1a1a;
  background-color: transparent;
  border-radius: 15px;
  color: #3b3b3b;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  min-height: 60px;
  margin-left: 25px;

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

export default LoginContainer;
