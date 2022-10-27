import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducer/authReducer";
import userReducer from "./reducer/userReducer";
import notificationReducer from "./reducer/notificationReducer";

const store = configureStore({
	reducer: {
		user: userReducer,
		notification: notificationReducer,
		auth: authReducer,
	},
});

export default store;
