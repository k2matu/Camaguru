import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: "",
};

export const authSlice = createSlice({
	name: "authorization",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.user = action.payload;
		},
		clear: (state) => {
			state.user = "";
		},
	},
});

export const { setAuth, clear } = authSlice.actions;
export default authSlice.reducer;
