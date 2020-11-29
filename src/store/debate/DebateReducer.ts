import {createSlice} from "@reduxjs/toolkit";
import {GetDebateMessageList, GetRecentDebateList} from "./DebateActions";


export type MessageInfo = {
  messageNo: number,
  threadNo: number,
  userNo: number,
  message: string,
  messageType: string,
  messageStatus: string,
  parentMessageNo?: number,
  quoteMessageNo?: number,
  refCount?: number,
  timestamp: string,
  updateTimestamp?: string
}

export type DebateInfo = {
  threadNo: number,
  threadName: string,
  parentThreadNo?: number,
  threadDescription?: string,
  createUserNo?: number,
  threadStatus: string,
  threadType: string
}

export type DebateStateType = {
  recentDebateList: DebateInfo[],
  debateMessageList: MessageInfo[],
  selectedThreadNo: number
}

const initialState: DebateStateType = {
  recentDebateList: [],
  debateMessageList: [],
  selectedThreadNo: 0
}

export const DebateSlice = createSlice({
  name: "debate",
  initialState,
  reducers: {
    setSelectedThreadNo: (state, action) => ({
      ...state,
      selectedThreadNo: action.payload
    })
  },
  extraReducers: builder => {
      builder.addCase(GetRecentDebateList.fulfilled, (state, action) => {
        const recentDebateList = action.payload.recentThreadList.map((thread: any) => ({
          threadNo: thread.threadNo,
          threadName: thread.threadName,
          parentThreadNo: thread.parentThreadNo,
          threadDescription: thread.threadDescription,
          createUserNo: thread.createUserNo,
          threadStatus: thread.threadStatus,
          threadType: thread.threadType
        }))
        return {
          ...state,
          recentDebateList: recentDebateList
        }
      })
        .addCase(GetRecentDebateList.rejected, (state, action) => {
          return {
            ...state,
            errorMsg: action.error.message ? action.error.message : "Invalid request"
          }
        })
        .addCase(GetDebateMessageList.fulfilled, (state, action) => {
          const debateMessageList = action.payload.messageList.map((message: any) => ({
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

          return {
            ...state,
            debateMessageList: debateMessageList
          }
        })
        .addCase(GetDebateMessageList.rejected, (state, action) => {
          return {
            ...state,
            errorMsg: action.error.message ? action.error.message : "Invalid request"
          }
        })
  }
})
