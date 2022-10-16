import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	newEmail: "",
	newUsername: "",
	newPassword: "",
};

export const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
		setNewEmail: (state, action) => {
			state.newEmail = action.payload;
		},
		setNewUsername: (state, action) => {
			state.newUsername = action.payload;
		},
		setNewPassword: (state, action) => {
			state.newPassword = action.payload;
		},
		clearFilters: (state) => {
			state.newEmail = "";
			state.newUsername = "";
			state.newPassword = "";
		},
	},
});

export const { setNewEmail, setNewUsername, setNewPassword, clearFilters } =
	registerSlice.actions;
export default registerSlice.reducer;
