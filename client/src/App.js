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
import { UsersDataContext } from "./Context/UsersContext";
import About from "./Components/About";

const App = () => {
const allRedFunc = useContext(UsersDataContext);
    console.log(allRedFunc.userState);
    CheckLoggedIn();


  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/LoginStudent" element={<LoginStudent />} />
          <Route path="/LoginMentor" element={<LoginMentor />} />
          <Route path="/LoginPage" element={<LoginContainer />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

const Wrapper = styled.div`
`;

export default App;
