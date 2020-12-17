import React, {useEffect, useState} from "react";
import Debate, {DebateProps} from "./Debate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useHistory, useLocation} from 'react-router-dom'
import {DebateSlice, UserInfo, WebSocketInfo} from "../../store/debate/DebateReducer";
import {GetDebateMessageList, GetDebateUserNoList} from "../../store/debate/DebateActions";
import requestMap from "../../utils/api/requestMap";
import {PostMessageToThreadParamType} from "../../utils/api/requestTypes";
import websocketMap from "../../utils/api/websocketMap";
import {CommonSlice} from "../../store/common/CommonReducer";

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
        threadNo: debateState.selectedThreadNo,
        message: message,
        messageType: "TEXT",
        accessToken: debateState.accessToken
      }
      requestMap.postMessageToThread(param)
    },
    debateInfo: debateState.selectedThreadInfo,
    goToThreadList: () => {
      history.push("/")
    }
  }

  const initialLoad = () => {
    const regex = /\/debate\/(?<threadNo>[0-9]+)/
    const groups = location.pathname.match(regex)!!.groups
    if (groups && groups.threadNo) {
      const threadNo = Number(groups.threadNo)
      dispatch(DebateSlice.actions.setSelectedThreadNo(threadNo))
      dispatch(GetDebateMessageList(threadNo))
      requestMap.getThreadInfo(threadNo).then((res) => {
        dispatch(DebateSlice.actions.setThreadInfo(res.data))
      })


      const dist = `/poll/room/${threadNo}/message`
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
        const newSocket = { id : subscribe.id, url: dist}
        dispatch(DebateSlice.actions.addWebSocket(newSocket))
      }

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

    }
  }

  const searchParam = {
    userNoList: debateState.searchUserNoList,
    threadNo: debateState.selectedThreadNo
  }
  const searchFlg = searchParam.userNoList.length > 0
  const getSearchUserNoList = () => {
     if (searchFlg) {
       dispatch(GetDebateUserNoList(searchParam))
     }
  }

  useEffect(initialLoad, [location.pathname, dispatch])
  useEffect(getSearchUserNoList, [searchFlg, dispatch])

  return (
    <Debate {...debateParam} />
  )
}

export default DebateContainer;
