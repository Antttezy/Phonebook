import { combineReducers, createStore } from "redux";
import { phonebookReducer } from "./phonebook/reducer";

const store = createStore(combineReducers({
    phonebookReducer
}))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store