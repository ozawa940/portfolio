import React from "react";
import Login from "./Login";
import {useHistory} from "react-router-dom";

const LoginContainer = () => {
  const history = useHistory()


  const signInProps = {
    loginHandler: () => {},
    goToSignUpHandler: () => {
       history.push("/login/sign-up");
    }
  };

  const signUpProps = {
    registerAccountHandler: () => {}
  }

  const loginProps = {
    signInProps: signInProps,
    signUpProps: signUpProps
  };

  return (
    <Login {...loginProps} />
  )
}

export default LoginContainer;
