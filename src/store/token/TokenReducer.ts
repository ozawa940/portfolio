import {createSlice} from "@reduxjs/toolkit";

export type TokenStateType = {
  accessToken: string,
  refreshToken: string,
}

const initialState: TokenStateType = {
  accessToken: "",
  refreshToken: "",
}
export const TokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => ({
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
    }),
    clearToken: (state, action) => ({
      ...state,
      accessToken: "",
      refreshToken: ""
    })
  }
})
