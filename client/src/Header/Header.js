import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UsersDataContext } from "../Components/Context/UsersContext";
import greenPic from "../assets/green future.png"
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookie from "js-cookie";

const Header = ({ trigger, settrigger }) => {
  //consume reducer State
  const allRedFunc = useContext(UsersDataContext);
  // checks if the user data loaded
  const isUserSignedIn = allRedFunc.userState.loadStatus;

  //Logs the user out
  const handleLogout = () => {
    allRedFunc.LogUserOut();
    Cookie.remove("userUId");
    settrigger(!trigger);
    window.alert("You are Signed Out")
  };
  return (
    <Container>
      <HomeButton to="/">
        <Logo src={greenPic} alt="BigCo Inc. logo" />
      </HomeButton>
      <Title to="/" style={{ color: "#FFDE59" }}>
        GREEN FUTURE MENTORSHIP
      </Title>
      {isUserSignedIn ? (
        <LoginButton
          onClick={handleLogout}
          style={{
            width: "45px",
            height: "45px",
          }}
          to="/"
        >
          <LogoutIcon
            style={{ color: "#FFDE59", width: "45px", height: "45px" }}
          />
          <LabelLog style={{ color: "#FFDE59" }}>Logout</LabelLog>
        </LoginButton>
      ) : (
        <LoginButton
          style={{
            width: "45px",
            height: "45px",
          }}
          to="/LoginPage"
        >
          <LoginIcon
            style={{ color: "#FFDE59", width: "45px", height: "45px" }}
          />
          <LabelLog style={{ color: "#FFDE59" }}>Login</LabelLog>
        </LoginButton>
      )}
    </Container>
  );
};
const LabelLog = styled.p`
  font-size: 20px;
`;
const Title = styled(NavLink)`
  letter-spacing: -1.5px;
  text-decoration: none;
  font-size: 45px;
  cursor: pointer;
  :hover {
    color: var(--color-navbar-beige);
  }
`;
const Logo = styled.img`
  height: 100px;
border-radius: 100px;
`
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
  width: "35px";
  height: "35px";

  font-size: 35px;

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
  height: 180px;

  background-color: #043419;

  display: flex;
  align-items: center;
  justify-content: space-between;

`;

export default Header;
