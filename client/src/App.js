import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles/GlobalStyles";

import Header from "./Header/Header";

import { useEffect, useState } from "react";
import LoginStudent from "./Components/LoginContainer/LoginStudent";
import HomeFeed from "./Components/HomeFeed";
import LoginContainer from "./Components/LoginContainer/LoginContainer";
import LoginMentor from "./Components/LoginContainer/loginMentor";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message);
      });
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/Home" element={<HomeFeed />} />
          <Route path="/LoginStudent" element={<LoginStudent />} />
          <Route path="/LoginMentor" element={<LoginMentor />} />
          <Route path="/LoginPage" element={<LoginContainer />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

const Wrapper = styled.div``;

export default App;
