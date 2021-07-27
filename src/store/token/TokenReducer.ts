import {createSlice} from "@reduxjs/toolkit";

export type Account = {
  userId: string,
  userName: string,
}

export type TokenStateType = {
  accessToken: string,
  refreshToken: string,
  account?: Account | null,
  initTokenFlg: boolean
}

const initialState: TokenStateType = {
  accessToken: "",
  refreshToken: "",
  account: null,
  initTokenFlg: false
}
export const TokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => ({
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      initTokenFlg: true
    }),
    clearToken: (state) => ({
      ...state,
      accessToken: "",
      refreshToken: ""
    }),
    setAccount: (state, action) => ({
      ...state,
      account: action.payload
    })
  }
})
