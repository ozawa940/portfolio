import GlobalConfig from '../../config'
import {AxiosRequestConfig, Method} from "axios";
import {getRequestHandler} from "./requestHandler";
import {GetDebateMessageListParamType, PostMessageToThreadParamType} from "./requestTypes";

const getConfig = (url: string, method: Method): AxiosRequestConfig => {
  return {
    baseURL: GlobalConfig.baseUrl,
    url: url,
    method: method
  };
};


const requestMap = {
  getRecentDebateList: () => {
    return getRequestHandler(getConfig("/thread/recent/thread-list", "get"));
  },
  getDebateMessageList: (threadNo: number) => {
    return getRequestHandler(getConfig(`/chat/message-list?threadNo=${threadNo}`, "get"))
  },
  getDebateUserList: (param: GetDebateMessageListParamType) => {
    return getRequestHandler(getConfig("/thread/username-list", "post"), param)
  },
  postMessageToThread: (param: PostMessageToThreadParamType) => {
    return getRequestHandler(getConfig("/chat/message", "post"), param)
  }
};

export default requestMap;
