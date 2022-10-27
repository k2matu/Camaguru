import { useJwt } from "react-jwt";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { setUsers } from "../../reducer/userReducer";
import { notification } from "../../reducer/notificationReducer";

import Notification from "../../components/Notification";
import Button from "../../components/Button";
import Link from "../../components/LinkTo";

import tokenService from "../../services/token";
import userService from "../../services/user";

const Confirm = () => {
	const [token, setToken] = useState("");
	const [success, setSuccess] = useState(false);
	const users = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const confirmationCode = useParams().confirmationCode;
	const { isExpired } = useJwt(confirmationCode);

	useEffect(() => {
		tokenService.getOne(confirmationCode).then((response) => {
			setToken(response.data);
		});
	}, [confirmationCode]);

	const user = users.find((user) => user.id === token.user);

	if (user?.status === "Pending" && !isExpired) {
		userService.updateUser(user.id, { status: "Active" }).then((response) => {
			dispatch(setUsers(users.map((n) => (n.id !== user.id ? n : response))));
			tokenService.remove(token.token).then(setToken(""));
			setSuccess(true);
		});
	}

	const resendCode = () => {
		if (user) {
			const newToken = {
				email: user.email,
				username: user.username,
			};
			tokenService.remove(token.token).then(setToken(""));
			tokenService.create(newToken);
			dispatch(
				notification(`Successfully resent new confirmationCode`, 60 * 2)
			);
		}
	};

	if (success) {
		return (
			<>
				<div>Account confirmed</div>
				<Link to="/" name="Login" />
			</>
		);
	} else if (isExpired) {
		return (
			<>
				<div>Token is invalid or expired</div>
				<Notification>
					<Button
						pretext="Send new confirmationcode?"
						onClick={resendCode}
						name="send"
					/>
				</Notification>
				<a href="/">Login In</a>
			</>
		);
	} else {
		return <div>Loading...</div>;
	}
};

export default Confirm;
