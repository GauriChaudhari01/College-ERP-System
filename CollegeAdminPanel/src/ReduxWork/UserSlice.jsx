import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {},
isLogin: false
}

let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        register: (state, actions) => {
            // state.userData = actions.payload
        },
        login: (state, actions) => {
            state.userData = actions.payload,
            state.isLogin = true
        },
        logout: (state) => {
            state.userData = {},
            state.isLogin = false


        }
    }
})
export const { register, login, logout } = userSlice.actions
export default userSlice.reducer