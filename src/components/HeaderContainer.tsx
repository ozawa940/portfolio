import React from "react";
import Header from "./Header";
import {useLocation, useHistory} from "react-router-dom";

const HeaderContainer = () => {
  const history = useHistory()
  const location = useLocation()

  const headerParam = {
    isLogin: false,
    isLoginPath: isLoginPath(location.pathname),
    goToLoginPageHandler: () => {
      history.push("/login");
    },
    goToMainPageHandler: () => {
      history.push("/");
    }
  }

  return (
    <Header {...headerParam}></Header>
  )
}

function isLoginPath(path: string) {
  const regex = /\/login.*/;
   if (path.match(regex)) {
     return true;
   } else {
     return false;
   }
}

export default HeaderContainer;
