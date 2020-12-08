import React, {useEffect, useState} from "react";
import Header from "./Header";
import {useLocation, useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";
import {isBlank, isNotBlank} from "../utils/validationUtils";
import requestMap from "../utils/api/requestMap";
import {useDispatch, useSelector} from "react-redux";
import {TokenSlice} from "../store/token/TokenReducer";
import {RootState} from "../store";

const HeaderContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const tokenState: any = useSelector<RootState>(state => {
    return {
      ...state.tokenReducer
    }
  })
  const [refreshFlg, setRefreshFlg] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken", "refreshToken"]);

  const checkTokenInCookie = () => {
    if (isNotBlank(cookie.accessToken) && isNotBlank(cookie.refreshToken)) {
      const cookieToken = {
        accessToken: cookie.accessToken,
        refreshToken: cookie.refreshToken
      }
      requestMap.checkAccessToken(cookieToken.accessToken).then((res) => {
        dispatch(TokenSlice.actions.setToken(cookieToken))
      }).catch((e) => {
        removeCookie("accessToken");
        cookieToken.accessToken = ""
        dispatch(TokenSlice.actions.setToken(cookieToken));
        setRefreshFlg(true)
      })
    }
  }

  const checkRefreshFlg = () => {
    if (refreshFlg) {
      removeCookie("refreshToken")
      if (isBlank(tokenState.refreshToken)) {
        dispatch(TokenSlice.actions.clearToken)
      }
      requestMap.refreshAccessToken(tokenState.refreshToken).then((res) => {
        const token = {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
        }
        dispatch(TokenSlice.actions.setToken(token))
        setCookie("accessToken", token.accessToken, { path: "/", sameSite: true });
        setCookie("refreshToken", token.accessToken, { path: "/", sameSite: true });
      }).catch((e) => {
        dispatch(TokenSlice.actions.clearToken)
      }).finally(() => {
        setRefreshFlg(false)
      })
    }
  }

  useEffect(checkTokenInCookie, [])
  useEffect(checkRefreshFlg, [refreshFlg])

  const headerParam = {
    isLogin: isNotBlank(tokenState.accessToken),
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
