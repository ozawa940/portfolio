import GlobalConfig from '../../config'
import {AxiosRequestConfig, Method} from "axios";
import {getRequestHandler} from "./requestHandler";
import {
  CreateThreadParamType,
  CreateUserParamType,
  GetAccessTokenParamType,
  GetDebateMessageListParamType,
  PostMessageToThreadParamType
} from "./requestTypes";

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
  },
  getThreadInfo: (threadNo: number) => {
    return getRequestHandler(getConfig(`/thread/info?threadNo=${threadNo}`, "get"))
  },
  getAccessToken: (param: GetAccessTokenParamType) => {
    return getRequestHandler(getConfig("/token", "post"), param)
  },
  checkAccessToken: (accessToken: string) => {
    return getRequestHandler(getConfig("/token/check-valid", "get"), null, {accessToken: accessToken})
  },
  refreshAccessToken: (refreshToken: string) => {
    return getRequestHandler(getConfig("/token/refresh", "get"), null, {refreshToken: refreshToken})
  },
  createUser: (param: CreateUserParamType) => {
    return getRequestHandler(getConfig("/user", "post"), param)
  },
  createThread: (param: CreateThreadParamType) => {
    return getRequestHandler(getConfig("/thread", "post"), param)
  }
};

export default requestMap;
