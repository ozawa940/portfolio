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
  parentDebateNo?: number | null,
  voteType: string
}

export type PostVoteParamType = {
  voteDebateNo: number,
  score: number,
  voteType: string,
  voteStatus: string,
  voteReason: string
}

export type PostBoardTicketParamType = {
  boardNo: number,
  boardTicketName: string,
  boardType: string,
  boardTicketStatus: string,
  boardTicketInfo: string
}
