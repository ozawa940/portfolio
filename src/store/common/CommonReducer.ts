import {createSlice} from "@reduxjs/toolkit";

export type CommonStateType = {
  showErrorFlg: boolean,
  errorTitle: string,
  errorMsg: string,
}

const initialState: CommonStateType = {
  showErrorFlg: false,
  errorTitle: "",
  errorMsg: ""
}


export const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setError: (state, action) => ({
      ...state,
      showErrorFlg: action.payload.showErrorFlg,
      errorTitle: action.payload.errorTitle,
      errorMsg: action.payload.errorMsg
    }),
    clearError: (state) => ({
      ...state,
      showErrorFlg: false,
      errorTitle: "",
      errorMsg: ""
    })
  }
})
