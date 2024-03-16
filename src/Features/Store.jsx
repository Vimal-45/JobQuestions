import { configureStore } from "@reduxjs/toolkit";
import jobQuesReduces from './Slice'


export const Store = configureStore({
    reducer: {
        quesAppReducer: jobQuesReduces
    }
})