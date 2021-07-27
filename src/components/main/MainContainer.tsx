import React, {useEffect} from "react";
import Main from "./Main";
import {useLocation} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {GetPrivateDebateList, GetRecentDebateList} from "../../store/debate/DebateActions";
import {RootState} from "../../store";

const MainContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const tokenState: any = useSelector<RootState>(state => {
    return {
      accessToken: state.tokenReducer.accessToken,
      initTokenFlg: state.tokenReducer.initTokenFlg
    }
  });

  const initialLoad = () => {
    dispatch(GetRecentDebateList())
    if (tokenState.accessToken != null) {
      dispatch(GetPrivateDebateList(tokenState.accessToken));
    }
  }

  useEffect(initialLoad, [location.pathname, dispatch, tokenState.initTokenFlg]);

  return (
    <Main />
  )
}


export default MainContainer;
