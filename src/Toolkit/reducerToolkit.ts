import {combineReducers} from "@reduxjs/toolkit";
import storageSession from "redux-persist/es/storage/session";
import {persistReducer} from "redux-persist";
import toolkitReducer from "./toolkitReducer";

const persistConfig = {
    key: "root",
    storage: storageSession,
    whitelist: ["fileFolder"],

};

const rootReducer = combineReducers({
    fileFolder:toolkitReducer
})

export default persistReducer(persistConfig, rootReducer)