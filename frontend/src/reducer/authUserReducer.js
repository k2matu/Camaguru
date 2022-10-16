import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	expiredToken: null,
};

export const authUserSlice = createSlice({
	name: "authoritizedUser",
	initialState,
	reducers: {
		setAuthUser: (state, action) => {
			state.user = action.payload;
		},
		setTokenValidity: (state, action) => {
			state.expiredToken = action.payload;
		},
		clearAuthUser: (state, action) => {
			state.user = "";
			state.expiredToken = null;
		},
	},
});

export const { setAuthUser, clearAuthUser, setTokenValidity } =
	authUserSlice.actions;
export default authUserSlice.reducer;
