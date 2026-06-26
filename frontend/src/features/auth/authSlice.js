import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,

        access:
            localStorage.getItem(
                "access_token"
            ) || null,

        refresh:
            localStorage.getItem(
                "refresh_token"
            ) || null,

        role:
            localStorage.getItem(
                "role"
            ) || null,

        isAuthenticated:
            !!localStorage.getItem(
                "access_token"
            ),
    },

    reducers: {
        loginSuccess: (
            state,
            action
        ) => {

            state.user =
                action.payload.user || null;

            state.access =
                action.payload.access;

            state.refresh =
                action.payload.refresh;

            state.role =
                action.payload.role;

            state.isAuthenticated = true;

            localStorage.setItem(
                "access_token",
                action.payload.access
            );

            localStorage.setItem(
                "refresh_token",
                action.payload.refresh
            );

            localStorage.setItem(
                "role",
                action.payload.role
            );
        },

        logout: (state) => {

            state.user = null;
            state.access = null;
            state.refresh = null;
            state.role = null;
            state.isAuthenticated = false;

            localStorage.removeItem(
                "access_token"
            );

            localStorage.removeItem(
                "refresh_token"
            );

            localStorage.removeItem(
                "role"
            );
        },

        setUser: (
            state,
            action
        ) => {
            state.user =
                action.payload;
        },
    },
});

export const {
    loginSuccess,
    logout,
    setUser,
} = authSlice.actions;

export default authSlice.reducer;