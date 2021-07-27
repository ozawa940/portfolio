import {createAsyncThunk} from "@reduxjs/toolkit";
import requestMap from "../../utils/api/requestMap";
import {GetDebateMessageListParamType} from "../../utils/api/requestTypes";


export const GetRecentDebateList = createAsyncThunk("debate/recentDebateList", async () => {
  try {
    const response = await requestMap.getRecentDebateList()
    return response.data
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.code);
    } else {
      throw new Error("Cannot connect server");
    }
  }
})

export const GetPrivateDebateList = createAsyncThunk("debate/privateDebateList", async (accessToken: string) => {
  try {
    const response = await requestMap.getPrivateDebateList(accessToken)
    return response.data
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.code);
    } else {
      throw new Error("Cannot connect server");
    }
  }
})

type MessageListReqType = {
  debateNo: number,
  accessToken: string
}

export const GetDebateMessageList = createAsyncThunk("debate/messageList", async (arg: MessageListReqType) => {
  try {
    const resMessage = await requestMap.getDebateMessageList(arg.debateNo, arg.accessToken)
    const userNoSet = new Set<number>()
    resMessage.data.messageList.filter((m: any) => m.userNo !== 0).forEach((m: any) => userNoSet.add(m.userNo))

    let resUser = null
    if (userNoSet.size !== 0) {
      const param = {
        debateNo: arg.debateNo,
        userNoList: Array.from(userNoSet)
      }
      resUser = await requestMap.getDebateUserList(param)
    }
    return {resUser: resUser?.data, resMessage: resMessage.data}
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.code);
    } else {
      throw new Error("Cannot connect server");
    }
  }
})

export const GetDebateUserNoList = createAsyncThunk("debate/userNoList", async (param: GetDebateMessageListParamType) => {
  try {
    const resUser = await requestMap.getDebateUserList(param)
    return resUser.data
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.code);
    } else {
      throw new Error("Cannot connect server");
    }
  }
})
