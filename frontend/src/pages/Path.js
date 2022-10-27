import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsers } from "../reducer/userReducer";

import Profile from "./UserFeatures/Profile";
import Resend from "./UserFeatures/Password/Resend";
import Repassword from "./UserFeatures/Password/Repassword";
import Register from "./UserFeatures/Register";
import Confirm from "./UserFeatures/Confirm";
import Home from "./Home";

import userService from "../services/user";

const Path = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		userService.getAll().then((response) => {
			dispatch(setUsers(response.data));
		});
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<Routes>
				<Route path="/confirm/:confirmationCode" element={<Confirm />} />
				<Route path="/register" element={<Register />} />
				<Route path="/repassword/:code" element={<Repassword />} />
				<Route path="/resend/" element={<Resend />} />
				<Route path="/profile/" element={<Profile />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
};

export default Path;
