import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "./reducer/registerReducer";
import userReducer from "./reducer/userReducer";
import notificationReducer from "./reducer/notificationReducer";
import authUserReducer from "./reducer/authUserReducer";

const store = configureStore({
	reducer: {
		register: registerReducer,
		user: userReducer,
		notification: notificationReducer,
		authUser: authUserReducer,
	},
});

export default store;
