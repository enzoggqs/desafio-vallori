import { createSlice } from "@reduxjs/toolkit";

const authorization = createSlice({
    name: 'user',
    initialState: {
        email: '',
        isLogged: false
    },
    reducers: {
        login (state, { payload }){
            return { ...state, isLogged: true, email: payload }
        },
        logout(state){
            return { ...state, isLogged: true, email: ''}
        }
    }
})

export const { login, logout } = authorization.actions
export default authorization.reducer;