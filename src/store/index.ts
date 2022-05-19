import { configureStore } from "@reduxjs/toolkit"
import authorization from "./Authorization.store"
import userDefault from "./UserDefault.store"

const store = configureStore({
    reducer: {
        userDefault: userDefault,
        currentUser: authorization
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store;