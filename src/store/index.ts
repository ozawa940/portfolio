import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {DebateSlice} from "./debate/DebateReducer";

const reducer = combineReducers({
  debateReducer: DebateSlice.reducer
});

export type RootState = ReturnType<typeof reducer>;

export default (
    configureStore({reducer: reducer})
)
