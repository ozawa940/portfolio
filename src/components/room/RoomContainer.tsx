import React, {useEffect, useState} from "react";
import Room from "./Room"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {DebateInfo, DebateSlice} from "../../store/debate/DebateReducer";
import {useHistory, useLocation} from "react-router-dom";
import requestMap from "../../utils/api/requestMap";
import {CreateDebateParamType, PostBoardTicketParamType} from "../../utils/api/requestTypes";
import NoticeModal from "../modal/NoticeModal";
import GlobalConfig from "../../config";

const RoomContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [voted, setVoted] = useState(false)
  const [notice, setNotice] = useState(false)

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
    .filter((info: DebateInfo) => info.debateNo !== selectedDebateNo && selectedDebateNo === info.parentDebateNo )

  const param = {
    recentDebate: recentDebateInfo.length > 0 ? recentDebateInfo[0] : {},
    childDebateList: childDebateList.length > 0 ? childDebateList : [],
    showDebateHandler: (isHome: boolean, debateNo: number) => {
      if (isHome) {
        dispatch(DebateSlice.actions.setSelectedDebateNo(debateNo))
        history.push("/");
      } else {
        dispatch(DebateSlice.actions.setSelectedDebateNo(debateNo))
        history.push(`/room/${debateNo}`);
      }
    },
    addDebateHandler: (param: CreateDebateParamType, callback: any) => {
      requestMap.createDebate(param).then(() => {
        callback()
        requestMap.getDebateInfo(debateState.selectedDebateNo).then((res) => {
          dispatch(DebateSlice.actions.setDebateInfo(res.data))
        })
      })
    },
    postVote: (isAgree: boolean) => {
      const param = {
        voteDebateNo: selectedDebateNo,
        score: isAgree ? 1 : 0,
        voteType: "FOR_AND_AGAINST",
        voteStatus: "PUBLIC",
        voteReason: "TEST"
      }
      requestMap.postVote(param)
      const callback = () => {
        requestMap.getVote(selectedDebateNo).then((res) => {
          dispatch(DebateSlice.actions.setSelectedVoteInfo(res.data))
        })
      }
      setVoted(true)
      setTimeout(callback, 5000)
    },
    voteInfo: debateState.selectedVoteInfo,
    voted: voted,
    deleteRequestHandler: () => {
      setNotice(true)
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
    requestMap.getVote(groups.debateNo).then((res) => {
      dispatch(DebateSlice.actions.setSelectedVoteInfo(res.data))
    })
    setVoted(false)
  }


  const noticeModalParam = {
    open: notice,
    closeHandler: () => {
      setNotice(false)
    },
    actionHandler: () => {
      const param = {
        boardNo: parseInt(GlobalConfig.deleteRequestBoardNo!!),
        boardTicketName: "削除申請",
        boardType: "DELETE_REQUEST",
        boardTicketStatus: "PUBLIC",
        boardTicketInfo: `debateNo: ${debateState.selectedDebateNo}`
      }
      requestMap.postBoardTicket(param).then((res) => {
        alert("申請完了しました")
        setNotice(false)
      })
    },
    message: "キャンセル申請を行いますか？",
  }

  useEffect(initialLoad, [location.pathname, dispatch])

  return (
    <React.Fragment>
      <Room {...param} />
      <NoticeModal {...noticeModalParam} />
    </React.Fragment>
  )
}

export default RoomContainer;
