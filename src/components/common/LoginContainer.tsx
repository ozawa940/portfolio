import React from "react";
import Login from "./Login";
import {useHistory} from "react-router-dom";
import requestMap from "../../utils/api/requestMap";
import {useDispatch} from "react-redux";
import {TokenSlice} from "../../store/token/TokenReducer";
import {useCookies} from "react-cookie";
import {CommonSlice} from "../../store/common/CommonReducer";

const LoginContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken", "refreshToken"]);


  const signInProps = {
    loginHandler: (id: string, code: string) => {
      const param = {
        authId: id,
        code: code
      }
      requestMap.getAccessToken(param).then((res) => {
        const token = {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
        }
        dispatch(TokenSlice.actions.setToken(token))
        setCookie("accessToken", token.accessToken, { path: "/", sameSite: true });
        setCookie("refreshToken", token.accessToken, { path: "/", sameSite: true });
        history.push("/")
      }).catch((e) => {
        const error = {
          showErrorFlg: true,
          errorTitle: e.response.data.code,
          errorMsg: e.response.data.message
        }
        dispatch(CommonSlice.actions.setError(error))
      })
    },
    goToSignUpHandler: () => {
       history.push("/login/sign-up");
    }
  };

  const signUpProps = {
    registerAccountHandler: (userId: string, userPassword: string, userName: string) => {
      const param = {
        userId: userId,
        userPassword: userPassword,
        userName: userName
      }
      requestMap.createUser(param).then((res) => {
        const token = {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
        }
        dispatch(TokenSlice.actions.setToken(token))
        setCookie("accessToken", token.accessToken, { path: "/", sameSite: true });
        setCookie("refreshToken", token.accessToken, { path: "/", sameSite: true });
        alert("アカウントが作成されました")
        history.push("/")
      }).catch((e) => {
        const error = {
          showErrorFlg: true,
          errorTitle: e.response.data.code,
          errorMsg: e.response.data.message
        }
        dispatch(CommonSlice.actions.setError(error))
      })
    }
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
