import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "../pages/Intro";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import Header from '../components/header/Header'

import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Intro />} /> 
            <Route
              path="/main"
              element={
                <>
                  <Header /> 
                  <Main />
                </>
              }
            />
            <Route
              path="/detail/:id"
              element={
                <>
                  <Header /> 
                  <Detail />
                </>
              }
            /> 
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Router;
