import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UsersDataContext } from "../Context/UsersContext";
import { IconContext } from "react-icons";
import { GrLogin } from "react-icons/gr";
import LoginIcon from "@mui/icons-material/Login";
const Header = () => {
  //consume reducer State
  const allRedFunc = useContext(UsersDataContext);
  // checks if the user data loaded
  const isUserSignedIn = allRedFunc.userState.loadStatus;
  console.log(allRedFunc.userState.loadStatus);

  return (
    <Container>
      <HomeButton to="/Home">Home</HomeButton>
      <LoginButton
        style={{ display: isUserSignedIn ? "none" : "block", width: "25px" }}
        to="/LoginPage"
      >
        <div style={{ color: "white" }}>
          <LoginIcon />
        </div>
      </LoginButton>
    </Container>
  );
};

const LoginButton = styled(NavLink)`
  margin-right: 140px;
  text-decoration: none;
  color: var(--color-white);
  cursor: pointer;
  :hover {
    color: var(--color-navbar-beige);
  }
`;
const HomeButton = styled(NavLink)`
  margin-left: 140px;
  text-decoration: none;
  color: var(--color-white);
  cursor: pointer;
  :hover {
    color: var(--color-navbar-beige);
  }
`;
const Container = styled.div`
  width: 100vw;
  height: 200px;

  background-color: #043419;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
`;

export default Header;
