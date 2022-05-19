import { createSlice } from "@reduxjs/toolkit";

const userDefault = createSlice({
    name: 'user',
    initialState: {
        email: 'teste@teste.com',
        password: 'teste123'
    },
    reducers: {

    }
})

export default userDefault.reducer;