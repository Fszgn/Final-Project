import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Container>
      <LoginButton to="/Login">Login</LoginButton>
      <HomeButton to="/Home">Home</HomeButton>
    </Container>
  );
};


const LoginButton = styled(NavLink)`
  margin-left: 40px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  :hover {
    background-color: black;
    color: var(--color-navbar-beige);
  }
`;
const HomeButton = styled(NavLink)`
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

    background-color: aqua;
`;

export default Header;
