import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles/GlobalStyles";

import Header from "./Header/Header";

import { useEffect, useState } from "react";
import Login from "./Components/Login";
import HomeFeed from "./Components/HomeFeed";

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
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

const Wrapper = styled.div``;

export default App;
