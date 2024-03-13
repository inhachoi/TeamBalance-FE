import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "../pages/Intro";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/main" element={<Main />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;
