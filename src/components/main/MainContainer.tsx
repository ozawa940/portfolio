import React, {useEffect} from "react";
import Main from "./Main";
import {useLocation} from "react-router-dom"
import {useDispatch} from "react-redux";
import {GetRecentDebateList} from "../../store/debate/DebateActions";

const MainContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const initialLoad = () => {
    dispatch(GetRecentDebateList())
  }

  useEffect(initialLoad, [location.pathname, dispatch]);

  return (
    <Main />
  )
}


export default MainContainer;
