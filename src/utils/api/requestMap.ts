import GlobalConfig from '../../config'
import {AxiosRequestConfig, Method} from "axios";
import {getRequestHandler} from "./requestHandler";
import {
  CreateDebateParamType,
  CreateUserParamType,
  GetAccessTokenParamType,
  GetDebateMessageListParamType, PostBoardTicketParamType,
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
  getPrivateDebateList: (accessToken: string) => {
    return getRequestHandler(getConfig("/debate/private/debate-list", "get"), null, {accessToken: accessToken});
  },
  getDebateMessageList: (debateNo: number, accessToken?: string) => {
    return getRequestHandler(getConfig(`/chat/message-list?debateNo=${debateNo}`, "get"), null, {accessToken: accessToken})
  },
  getDebateUserList: (param: GetDebateMessageListParamType) => {
    return getRequestHandler(getConfig("/thread/username-list", "post"), param)
  },
  postMessageToThread: (param: PostMessageToThreadParamType) => {
    return getRequestHandler(getConfig("/chat/message", "post"), param)
  },
  getDebateInfo: (debateNo: number, accessToken?: string) => {
    return getRequestHandler(getConfig(`/debate?debateNo=${debateNo}`, "get"), null, {accessToken: accessToken})
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
  deleteAccessToken: (accessToken: string) => {
    return getRequestHandler(getConfig("/token", "delete"), null, {accessToken: accessToken})
  },
  createUser: (param: CreateUserParamType) => {
    return getRequestHandler(getConfig("/user", "post"), param)
  },
  createDebate: (param: CreateDebateParamType, accessToken?: string) => {
    return getRequestHandler(getConfig("/debate", "post"), param, {accessToken})
  },
  postVote: (param: PostVoteParamType) => {
    return getRequestHandler(getConfig("/vote", "post"), param)
  },
  postBoardTicket: (param: PostBoardTicketParamType, accessToken?: string) => {
    if (accessToken) {
      return getRequestHandler(getConfig("/board/ticket", "post"), param, {accessToken: accessToken})
    } else {
      return getRequestHandler(getConfig("/board/ticket", "post"), param)
    }
  },
  getVote: (debateNo: number) => {
    return getRequestHandler(getConfig(`/vote?debateNo=${debateNo}`, "get"))
  },
  getUserByAccessToken: (accessToken: string) => {
    return getRequestHandler(getConfig("/user", "get"), null, {accessToken: accessToken})
  }
};

export default requestMap;
