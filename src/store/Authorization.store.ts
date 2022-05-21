import { createSlice } from "@reduxjs/toolkit";

const authorization = createSlice({
    name: 'user',
    initialState: {
        user: '',
        isLogged: false
    },
    reducers: {
        login (state, { payload }){
            return { ...state, isLogged: true, user: payload }
        },
        logout(state){
            return { ...state, isLogged: true, email: ''}
        }
    }
})

export const { login, logout } = authorization.actions
export default authorization.reducer;