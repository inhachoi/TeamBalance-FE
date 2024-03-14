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
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Detail />} />
        <Route path="/main" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
=======
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/main" element={<Main />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </ThemeProvider>
>>>>>>> 15cc366ed36c56d574e7853979be19a1df786a84
    </BrowserRouter>
  );
};

export default Router;
