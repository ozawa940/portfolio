export type GetDebateMessageListParamType = {
  debateNo: number,
  userNoList: number[]
}


export type PostMessageToThreadParamType = {
  debateNo: number,
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

export type CreateDebateParamType = {
  debateName: string,
  debateDescribe: string,
  debateType: string,
  debateStatus: string,
  parentDebateNo?: number | null
}
