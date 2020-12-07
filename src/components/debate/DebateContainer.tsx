import React, {useEffect} from "react";
import Debate, {DebateProps} from "./Debate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import { useLocation } from 'react-router-dom'
import {DebateSlice} from "../../store/debate/DebateReducer";
import {GetDebateMessageList} from "../../store/debate/DebateActions";
import requestMap from "../../utils/api/requestMap";
import {PostMessageToThreadParamType} from "../../utils/api/requestTypes";
import {Client} from "@stomp/stompjs";
import websocketMap from "../../utils/api/websocketMap";

const DebateContainer = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const debateState: any = useSelector<RootState>(state => {
    return {...state.debateReducer}
  });

  const debateParam: DebateProps = {
    messageList: debateState.debateMessageList,
    userNoList: debateState.userNoList,
    sendMessage: (message: string) => {
      const param: PostMessageToThreadParamType = {
        threadNo: debateState.selectedThreadNo,
        message: message,
        messageType: "TEXT",
        accessToken: ""
      }
      requestMap.postMessageToThread(param)
    }
  }


  const initialLoad = () => {
    const regex = /\/debate\/(?<threadNo>[0-9]+)/
    const groups = location.pathname.match(regex)!!.groups
    if (groups && groups.threadNo) {
      const threadNo = Number(groups.threadNo)
      dispatch(DebateSlice.actions.setSelectedThreadNo(threadNo))
      dispatch(GetDebateMessageList(threadNo))

      const client = websocketMap.connectWebsocket(() => {})

      const connectWebsocketCallback = () => {
        // @ts-ignore
        client.subscribe(`/poll/room/${threadNo}/message`, (msg: any) => {
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
        })
      }

      websocketMap.updateConfig(client, connectWebsocketCallback)

      client.activate()
    }
  }


  useEffect(initialLoad, [location.pathname, dispatch])

  return (
    <Debate {...debateParam} />
  )
}

export default DebateContainer;
