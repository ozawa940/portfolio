import {createAsyncThunk} from "@reduxjs/toolkit";
import requestMap from "../../utils/api/requestMap";


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

export const GetDebateMessageList = createAsyncThunk("debate/messageList", async (threadNo: number) => {
  try {
    const resMessage = await requestMap.getDebateMessageList(threadNo)
    const userNoSet = new Set<number>()
    resMessage.data.messageList.filter((m: any) => m.userNo !== 0).forEach((m: any) => userNoSet.add(m.userNo))

    let resUser = null
    if (userNoSet.size !== 0) {
      const param = {
        threadNo: threadNo,
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
