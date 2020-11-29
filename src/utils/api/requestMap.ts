import GlobalConfig from '../../config'
import {AxiosRequestConfig, Method} from "axios";
import {getRequestHandler} from "./requestHandler";

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
    return getRequestHandler(getConfig(`/chat/message-list?thread=${threadNo}`, "get"))
  }
};

export default requestMap;
