import GlobalConfig from '../../config'
import {AxiosRequestConfig, Method} from "axios";
import {getRequestHandler} from "./requestHandler";
import {
  CreateDebateParamType,
  CreateUserParamType,
  GetAccessTokenParamType,
  GetDebateMessageListParamType,
  PostMessageToThreadParamType, PostVoteParamType
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
    return getRequestHandler(getConfig("/debate/recent/debate-list", "get"));
  },
  getDebateMessageList: (debateNo: number) => {
    return getRequestHandler(getConfig(`/chat/message-list?debateNo=${debateNo}`, "get"))
  },
  getDebateUserList: (param: GetDebateMessageListParamType) => {
    return getRequestHandler(getConfig("/thread/username-list", "post"), param)
  },
  postMessageToThread: (param: PostMessageToThreadParamType) => {
    return getRequestHandler(getConfig("/chat/message", "post"), param)
  },
  getDebateInfo: (debateNo: number) => {
    return getRequestHandler(getConfig(`/debate?debateNo=${debateNo}`, "get"))
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
  createDebate: (param: CreateDebateParamType) => {
    return getRequestHandler(getConfig("/debate", "post"), param)
  },
  postVote: (param: PostVoteParamType) => {
    return getRequestHandler(getConfig("/vote", "post"), param)
  },
  getVote: (debateNo: number) => {
    return getRequestHandler(getConfig(`/vote?debateNo=${debateNo}`, "get"))
  }
};

export default requestMap;
