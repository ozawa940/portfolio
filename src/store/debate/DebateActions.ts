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

export const GetDebateMessageList = createAsyncThunk("debate/messageList", async (param: GetDebateMessageListParamType) => {
  try {
    const response = await requestMap.getDebateMessageList(param.threadNo)
    return response.data
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.code);
    } else {
      throw new Error("Cannot connect server");
    }
  }
})
