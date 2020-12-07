export type GetDebateMessageListParamType = {
  threadNo: number,
  userNoList: number[]
}


export type PostMessageToThreadParamType = {
  threadNo: number,
  message: string,
  messageType: string,
  accessToken: string
}
