import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: {
		notis: "",
		visible: false,
	},
	reducers: {
		setNotification(state, action) {
			state.notis = action.payload;
			state.visible = true;
		},
		removing(state) {
			state.notis = "";
			state.visible = false;
		},
	},
});

export const { setNotification, removing } = notificationSlice.actions;

let timeoutId;
export const notification = (content, seconds) => {
	return async (dispatch) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		dispatch(setNotification(content));
		timeoutId = setTimeout(() => {
			dispatch(removing());
		}, seconds * 1000);
	};
};
export default notificationSlice.reducer;
