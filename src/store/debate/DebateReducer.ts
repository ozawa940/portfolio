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
  debateNo: number,
  debateRootNo: number
  debateName: string,
  debateDescribe: string,
  debateType: string,
  debateStatus: string,
  threadNo: number,
  parentDebateNo: number,
  createUserNo: number,
  registerDateTime: string,
  updateDateTime: string
}

export type VoteInfo = {
  score: number,
  count: number
}

export type WebSocketInfo = {
  id: any,
  url: string
}

export type DebateStateType = {
  recentDebateList: DebateInfo[],
  debateMessageList: MessageInfo[],
  userNoList: UserInfo[],
  selectedDebateInfo: DebateInfo[],
  selectedDebateNo: number,
  searchUserNoList: number[],
  webSocketList: WebSocketInfo[],
  selectedVoteInfo?: VoteInfo
}

const initialState: DebateStateType = {
  recentDebateList: [],
  debateMessageList: [],
  userNoList: [],
  selectedDebateInfo: [],
  selectedDebateNo: 0,
  searchUserNoList: [],
  webSocketList: [],
  selectedVoteInfo: {
    score: 0,
    count: 0
  }
}

export const DebateSlice = createSlice({
  name: "debate",
  initialState,
  reducers: {
    setSelectedDebateNo: (state, action) => ({
      ...state,
      selectedDebateNo: action.payload
    }),
    setDebateInfo: (state, action) => {
      const debateList = action.payload.debateList.map((debate: any) => ({
        debateNo: debate.debateNo,
        debateRootNo: debate.debateRootNo,
        debateName: debate.debateName,
        debateDescribe: debate.debateDescribe,
        debateType: debate.debateType,
        debateStatus: debate.debateStatus,
        threadNo: debate.threadNo,
        parentDebateNo: debate.parentDebateNo,
        createUserNo: debate.createUserNo,
        registerDateTime: debate.registerDateTime,
        updateDateTime: debate.updateDateTime
      }))
      return {
        ...state,
        selectedDebateInfo: debateList
      }
    },
    setSelectedVoteInfo: (state, action) => ({
      ...state,
      selectedVoteInfo: action.payload
    }),
    addMessageList: (state, action) => {
      const debateMessageList = state.debateMessageList.concat(action.payload).sort((n1, n2) => n1.messageNo - n2.messageNo);
      const prevDebateUserNoList = state.debateMessageList.map((message: any) => message.userNo)
      const newDebateUserNoList = debateMessageList.map((message: any) => message.userNo)
      const searchUserNoList = newDebateUserNoList.filter(num => num > 0 && prevDebateUserNoList.indexOf(num) === -1)

      return {
      ...state,
        debateMessageList: debateMessageList,
        searchUserNoList: searchUserNoList
      }
    },
    addWebSocket: (state, action) => {
      let webSocketList: WebSocketInfo[] = state.webSocketList.concat([])
      if (state.webSocketList.filter(sock => sock.url === action.payload.url).length === 0) {
        webSocketList = state.webSocketList.concat([action.payload])
      }
      return {
        ...state,
        webSocketList: webSocketList
      }
    },
    removeWebSocket: (state, action) => {
      let webSocketList = state.webSocketList.filter(sock => sock.url !== action.payload.url);
      return {
        ...state,
        webSocketList: webSocketList
      }
    },
    clearWebSocket: (state) => ({
      ...state,
      webSocketList: []
    }),
  },
  extraReducers: builder => {
      builder.addCase(GetRecentDebateList.fulfilled, (state, action) => {
        const recentDebateList = action.payload.debateList.filter((debate: any) => !debate.parentDebateNo).map((debate: any) => ({
          debateNo: debate.debateNo,
          debateRootNo: debate.debateRootNo,
          debateName: debate.debateName,
          debateDescribe: debate.debateDescribe,
          debateType: debate.debateType,
          debateStatus: debate.debateStatus,
          threadNo: debate.threadNo,
          parentDebateNo: debate.parentDebateNo,
          createUserNo: debate.createUserNo,
          registerDateTime: debate.registerDateTime,
          updateDateTime: debate.updateDateTime
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
