import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/book.slice";

const rootReducer = combineReducers({
    books: bookSlice
}) 

export const makeStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']