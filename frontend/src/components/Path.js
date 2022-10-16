import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsers } from "../reducer/userReducer";

import RePassword from "./RePassword";
import Register from "./Register";
import AccConfirmed from "./AccConfirmed";
import Home from "./Home";
import Message from "./Message";

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
				<Route path="/confirm/:confirmationCode" element={<AccConfirmed />} />
				<Route path="/register" element={<Register />} />
				<Route path="/message" element={<Message />} />
				<Route path="/repassword" element={<RePassword />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
};

export default Path;
