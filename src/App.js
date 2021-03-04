import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";

import styled from "styled-components";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase/firebase";

import logo from "./assets/logo_.png";

import Spinner from "react-spinkit";

import "./App.css";

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src={logo} alt="Slack Logo" />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Chat} />
            </Switch>
          </AppBody>
        </>
      )}
    </Router>
  );
};

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-bottom: 100px;
  justify-content: center;
  align-items: center;

  > img {
    height: 150px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
