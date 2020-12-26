import React, {useEffect} from "react";
import Room from "./Room"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {DebateInfo, DebateSlice} from "../../store/debate/DebateReducer";
import {useHistory, useLocation} from "react-router-dom";
import requestMap from "../../utils/api/requestMap";

const RoomContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const debateState: any = useSelector<RootState>(state => {
    return {
      ...state.debateReducer,
      accessToken: state.tokenReducer.accessToken
    }
  })

  const selectedDebateNo = debateState.selectedDebateNo ? parseInt(debateState.selectedDebateNo) : 0

  const recentDebateInfo = debateState.selectedDebateInfo
    .filter((info: DebateInfo) => info.debateNo === selectedDebateNo)

  const childDebateList = debateState.selectedDebateInfo
    .filter((info: DebateInfo) => info.debateNo !== selectedDebateNo)

  const param = {
    recentDebate: recentDebateInfo.length > 0 ? recentDebateInfo[0] : [],
    childDebateList: childDebateList.length > 0 ? childDebateList : [],
    showDebateHandler: (debateNo: number) => {
      dispatch(DebateSlice.actions.setSelectedDebateNo(debateNo))
      history.push(`/room/${debateNo}`);
    }
  }

  const initialLoad = () => {
    const regex = /\/room\/(?<debateNo>[0-9]+)/
    const groups: any = location.pathname.match(regex)!!.groups
    if (!groups || !groups.debateNo) {
      return
    }
    dispatch(DebateSlice.actions.setSelectedDebateNo(groups.debateNo));
    requestMap.getDebateInfo(groups.debateNo).then((res) => {
      dispatch(DebateSlice.actions.setDebateInfo(res.data))
    })
  }

  useEffect(initialLoad, [location.pathname, dispatch])

  return (
    <Room {...param} />
  )
}

export default RoomContainer;
