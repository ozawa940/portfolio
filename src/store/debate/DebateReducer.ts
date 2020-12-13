import {createSlice} from "@reduxjs/toolkit";
import {GetDebateMessageList, GetDebateUserNoList, GetRecentDebateList} from "./DebateActions";

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

export type UserInfo = {
  userNo: number,
  userName: string
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
  userNoList: UserInfo[],
  selectedThreadInfo: DebateInfo,
  selectedThreadNo: number,
  searchUserNoList: number[]
}

const initialState: DebateStateType = {
  recentDebateList: [],
  debateMessageList: [],
  userNoList: [],
  selectedThreadInfo: {} as DebateInfo,
  selectedThreadNo: 0,
  searchUserNoList: []
}

export const DebateSlice = createSlice({
  name: "debate",
  initialState,
  reducers: {
    setSelectedThreadNo: (state, action) => ({
      ...state,
      selectedThreadNo: action.payload
    }),
    setThreadInfo: (state, action) => {
      const thread = action.payload;
      const threadInfo = {
        threadNo: thread.threadNo,
        threadName: thread.threadName,
        parentThreadNo: thread.parentThreadNo,
        threadDescription: thread.threadDescription,
        createUserNo: thread.createUserNo,
        threadStatus: thread.threadStatus,
        threadType: thread.threadType
      };
      return {
        ...state,
        selectedThreadInfo: threadInfo
      }
    },
    addMessageList: (state, action) => {
      const debateMessageList = state.debateMessageList.concat(action.payload).sort((n1, n2) => n1.messageNo - n2.messageNo);
      const prevDebateUserNoList = state.debateMessageList.map((message: any) => message.userNo)
      const newDebateUserNoList = debateMessageList.map((message: any) => message.userNo)
      const searchUserNoList = newDebateUserNoList.filter(num => prevDebateUserNoList.indexOf(num) === -1)

      return {
      ...state,
        debateMessageList: debateMessageList,
        searchUserNoList: searchUserNoList
      }
    }
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
          let debateMessageList: MessageInfo[] = []
          debateMessageList = action.payload.resMessage.messageList.map((message: any) => ({
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


          let userNoList: UserInfo[] = []
          if (action.payload.resUser) {
            Object.keys(action.payload.resUser).forEach(key => {
              userNoList.push({
                userName: action.payload.resUser[key],
                userNo: Number(key)
              })
            })
          }

          return {
            ...state,
            debateMessageList: debateMessageList,
            userNoList: userNoList
          }
        })
        .addCase(GetDebateMessageList.rejected, (state, action) => {
          return {
            ...state,
            errorMsg: action.error.message ? action.error.message : "Invalid request"
          }
        })
        .addCase(GetDebateUserNoList.fulfilled, (state, action) => {

          let userNoList: UserInfo[] = []
          Object.keys(action.payload).forEach(key => {
            userNoList.push({
              userName: action.payload[key],
              userNo: Number(key)
            })
          })

          return {
            ...state,
            userNoList: state.userNoList.concat(userNoList),
            searchUserNoList: []
          }
        })
        .addCase(GetDebateUserNoList.rejected, (state, action) => {
          return {
            ...state,
            errorMsg: action.error.message ? action.error.message : "Invalid request"
          }
        })
  }
})
