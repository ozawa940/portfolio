import React, {Dispatch, useEffect} from "react";
import Debate, {DebateProps} from "./Debate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useHistory, useLocation} from 'react-router-dom'
import {DebateSlice} from "../../store/debate/DebateReducer";
import {GetDebateMessageList, GetDebateUserNoList} from "../../store/debate/DebateActions";
import requestMap from "../../utils/api/requestMap";
import {PostMessageToThreadParamType} from "../../utils/api/requestTypes";
import websocketMap from "../../utils/api/websocketMap";

const DebateContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const debateState: any = useSelector<RootState>(state => {
    return {
      ...state.debateReducer,
      accessToken: state.tokenReducer.accessToken
    }
  });

  const debateParam: DebateProps = {
    messageList: debateState.debateMessageList,
    userNoList: debateState.userNoList,
    sendMessage: (message: string) => {
      const param: PostMessageToThreadParamType = {
        debateNo: debateState.selectedDebateNo,
        message: message,
        messageType: "TEXT",
        accessToken: debateState.accessToken
      }
      requestMap.postMessageToThread(param)
    },
    debateInfo: debateState.selectedDebateInfo,
    goToThreadList: () => {
      history.push("/")
    }
  }

  const searchParam = {
    userNoList: debateState.searchUserNoList,
    debateNo: debateState.selectedDebateNo
  }
  const searchFlg = searchParam.userNoList.length > 0
  const getSearchUserNoList = () => {
     if (searchFlg) {
       dispatch(GetDebateUserNoList(searchParam))
     }
  }

  useEffect(() => initialLoad(dispatch, location), [location.pathname, dispatch])
  useEffect(getSearchUserNoList, [searchFlg, dispatch])

  return (
    <Debate {...debateParam} />
  )
}

function initialLoad(dispatch: Dispatch<any>, location: any) {
  const regex = /\/room\/(?<debateNo>[0-9]+)/
  const groups: any = location.pathname.match(regex)!!.groups
  if (!groups || !groups.debateNo) {
    return
  }

  requestMap.getDebateInfo(groups.debateNo).then((res) => {
    dispatch(DebateSlice.actions.setDebateInfo(res.data))

    const threadNo = res.data.debateList
      .filter((debate: any) => debate.debateNo.toString() === groups.debateNo )
      .map((debate: any) => debate.threadNo)[0]

    const dist = `/poll/room/${threadNo}/message`
    const distVote = `/poll/room/${groups.debateNo}/vote`

    let client = window.WebSocketClient
    const connectWebsocketCallback = async () => {
      const subscribe = await client.subscribe(dist, (msg: any) => {
        const messageList = JSON.parse(msg.body)
        if (messageList.length > 0) {
          const debateMessageList = messageList.map((message: any) => ({
            messageNo: message.messageNo,
            threadNo: message.threadNo,
            userNo: message.userNo,
            message: message.message,
            messageType: message.messageType,
            messageStatus: message.messageStatus,
            parentMessageNo: message.parentMessageNo,
            quoteMessageNo: message.quoteMessageNo,
            refCount: message.refCount,
            timestamp: message.timestamp,
            updateTimestamp: message.updateTimestamp
          }))
          dispatch(DebateSlice.actions.addMessageList(debateMessageList))
        }
      });
      // check Update
      await client.subscribe(distVote, (msg: any) => {
        const voteList = JSON.parse(msg.body)
        if (voteList.length > 0) {
          const getVote = () => {
            requestMap.getVote(groups.debateNo).then((res) => {
              dispatch(DebateSlice.actions.setSelectedVoteInfo(res.data))
            })
          }
          // wait update cache
          setTimeout(getVote, 5000)
        }
      });
      const newSocket = { id : subscribe.id, url: dist}
      dispatch(DebateSlice.actions.addWebSocket(newSocket))
    }

    const debateNo = Number(groups.debateNo)
    dispatch(DebateSlice.actions.setSelectedDebateNo(debateNo))
    dispatch(GetDebateMessageList(debateNo))


    if (client){
      client.deactivate().then(() => {
        dispatch(DebateSlice.actions.clearWebSocket())
        websocketMap.updateConfig(client, connectWebsocketCallback)
        client.activate()
      })
    } else {
      window.WebSocketClient = websocketMap.connectWebsocket(() => {})
      client = window.WebSocketClient
      websocketMap.updateConfig(client, connectWebsocketCallback)
      client.activate()
    }

  })

}

export default DebateContainer;
