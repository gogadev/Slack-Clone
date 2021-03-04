import React from "react";

import { LoginContainer, LoginInnerContainer } from "./login.styled";

import { Button } from "@material-ui/core";

import logo from "../../assets/logo_.png";

import { auth, provider } from "../../firebase/firebase";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src={logo} alt="Slack Logo" />
        <h1>Sign In To The Goga Fam</h1>
        <p>goga.slack.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;
