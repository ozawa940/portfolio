import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {DebateSlice} from "./debate/DebateReducer";
import {TokenSlice} from "./token/TokenReducer";

const reducer = combineReducers({
  debateReducer: DebateSlice.reducer,
  tokenReducer: TokenSlice.reducer
});

export type RootState = ReturnType<typeof reducer>;

export default (
    configureStore({reducer: reducer})
)
