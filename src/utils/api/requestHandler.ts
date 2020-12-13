import axios, {AxiosRequestConfig} from "axios";

type HeaderParam = {
  accessToken?: string,
  refreshToken?: string
}

export function getRequestHandler(config: AxiosRequestConfig, param?: any, headerParam?: HeaderParam) {
  config.headers = {
    ...headerParam
  }
  config.data = param
  return axios(config)
}
