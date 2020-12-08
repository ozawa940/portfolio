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

export type GetAccessTokenParamType = {
  authId: string,
  code: string
}

export type CreateUserParamType = {
  userId: string,
  userPassword: string,
  userName: string
}
