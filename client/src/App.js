import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles/GlobalStyles";
import CheckLoggedIn from "./Components/Hooks/CheckLoggedIn";
import Header from "./Header/Header";

import { useEffect, useState, useContext } from "react";
import LoginStudent from "./Components/LoginContainer/LoginStudent";
import HomeFeed from "./Components/HomeFeed";
import LoginContainer from "./Components/LoginContainer/LoginContainer";
import LoginMentor from "./Components/LoginContainer/loginMentor";
import { UsersDataContext } from "./Components/Context/UsersContext";
import About from "./Components/About";
import ProfilePage from "./Components/ProfilePage";
import DirectMessage from "./Components/DirectMessage";

const App = () => {
  //state triggers fetches
  const [trigger, settrigger] = useState(false);

  CheckLoggedIn({ trigger, settrigger });

  return (
    <Router>
      <GlobalStyles />
      <Container>
        <Header trigger={trigger} settrigger={settrigger} />
        <Routes>
          <Route
            path="/fullProfile/:id"
            element={<ProfilePage />}
          />
          <Route
            path="/"
            element={<HomeFeed trigger={trigger} settrigger={settrigger} />}
          />
          <Route
            path="/LoginStudent"
            element={<LoginStudent trigger={trigger} settrigger={settrigger} />}
          />
          <Route
            path="/LoginMentor"
            element={<LoginMentor trigger={trigger} settrigger={settrigger} />}
          />
          <Route
            path="/LoginPage"
            element={
              <LoginContainer  />
            }
          />
          <Route path="/About" element={<About />} />
        </Routes>
        <DirectMessage />
      </Container>
    </Router>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default App;
