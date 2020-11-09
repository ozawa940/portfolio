import {combineReducers, configureStore} from '@reduxjs/toolkit';

const reducer = combineReducers({})

export type RootState = ReturnType<typeof reducer>;

export default (
    configureStore({reducer: reducer})
)
