import { useJwt } from "react-jwt";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../reducer/userReducer";
import { notification } from "../reducer/notificationReducer";

import Notification from "./Notification";

import { useParams, Link } from "react-router-dom";

import tokenService from "../services/token";
import userService from "../services/user";

const AccConfirmed = () => {
	const dispatch = useDispatch();
	const [token, setToken] = useState("");
	const [success, setSuccess] = useState(false);
	const users = useSelector((state) => state.user);

	const confirmationCode = useParams().confirmationCode;
	const { isExpired } = useJwt(confirmationCode);

	useEffect(() => {
		tokenService.getOne(confirmationCode).then((response) => {
			setToken(response.data);
		});
	}, [confirmationCode]);

	const user = users.find((user) => user.id === token.user);

	if (user?.status === "Pending" && !isExpired) {
		const confirmed = {
			email: user.email,
			username: user.username,
			status: "Active",
		};
		userService.update(user.id, confirmed).then((response) => {
			dispatch(setUsers(users.map((n) => (n.id !== user.id ? n : response))));
			tokenService.remove(token.token).then(setToken(""));
			setSuccess(true);
		});
	}

	const resendCode = () => {
		if (user) {
			console.log("resending");
			const newToken = {
				email: user.email,
				username: user.username,
			};
			tokenService.remove(token.token).then(setToken(""));
			tokenService.create(newToken);
			dispatch(
				notification(`Successfully resent new confirmationCode`, 60 * 5)
			);
		}
	};

	if (success) {
		return (
			<div>
				<div>Account confirmed</div>
				<Link to="/">Login</Link>
			</div>
		);
	} else if (isExpired) {
		return (
			<div>
				<div>Token is invalid or expired</div>
				<Notification>
					<div>
						Send new confirmationCode?{" "}
						<button onClick={resendCode}>send</button>
					</div>
				</Notification>
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
};

export default AccConfirmed;
