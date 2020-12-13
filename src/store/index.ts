import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {DebateSlice} from "./debate/DebateReducer";
import {TokenSlice} from "./token/TokenReducer";
import {CommonSlice} from "./common/CommonReducer";

const reducer = combineReducers({
  debateReducer: DebateSlice.reducer,
  tokenReducer: TokenSlice.reducer,
  commonReducer: CommonSlice.reducer
});

export type RootState = ReturnType<typeof reducer>;

export default (
    configureStore({reducer: reducer})
)
