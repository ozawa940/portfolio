import React, {useEffect} from "react";
import Debate, {DebateProps} from "./Debate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import { useLocation } from 'react-router-dom'
import {DebateSlice} from "../../store/debate/DebateReducer";
import {GetDebateMessageList} from "../../store/debate/DebateActions";

const DebateContainer = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const debateState: any = useSelector<RootState>(state => {
    return {...state.debateReducer}
  });

  const debateParam: DebateProps = {
    messageList: debateState.debateMessageList,
    userNoList: debateState.userNoList
  }
  const initialLoad = () => {
    const regex = /\/debate\/(?<threadNo>[0-9]+)/
    const groups = location.pathname.match(regex)!!.groups
    if (groups && groups.threadNo) {
      dispatch(DebateSlice.actions.setSelectedThreadNo(Number(groups.threadNo)))
      dispatch(GetDebateMessageList(Number(groups.threadNo)))
    }
  }


  useEffect(initialLoad, [location.pathname, dispatch])

  return (
    <Debate {...debateParam} />
  )
}

export default DebateContainer;
