import { Link } from "react-router-dom";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	setNewEmail,
	setNewPassword,
	setNewUsername,
	clearFilters,
} from "../reducer/registerReducer";
import { appendUser } from "../reducer/userReducer";
import { notification } from "../reducer/notificationReducer";
import userService from "../services/user";
import tokenService from "../services/token";

import Notification from "./Notification";

const Register = () => {
	const { newEmail, newUsername, newPassword } = useSelector(
		(state) => state.register
	);
	const dispatch = useDispatch();
	const notificationRef = useRef();

	const checkValidation = () => {
		if (!newEmail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
			alert("Please enter a valid email");
			return window.stop();
		}
		if (!newUsername.match(/^\w{1,30}$/)) {
			alert(
				"Please enter a password between 8-15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit and one special character"
			);
			return window.stop();
		}
		if (
			!newPassword.match(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
			)
		) {
			alert("You have entered an invalid email adress");
			return window.stop();
		}
	};

	const addUser = async (e) => {
		e.preventDefault();
		checkValidation();

		const newUser = {
			email: newEmail,
			username: newUsername,
			password: newPassword,
		};

		await userService.create(newUser);
		await tokenService.create(newUser);

		dispatch(appendUser(newUser));
		dispatch(
			notification(
				`User ${newUsername} was created successfully! Please check your email`,
				60 * 5
			)
		);
		dispatch(clearFilters());
	};

	return (
		<div>
			<h1>Camaguru</h1>
			<h3>Sign up to see photos and videos from your friends.</h3>
			<Notification ref={notificationRef}>
				<div>
					<form onSubmit={addUser}>
						<div>
							<input
								placeholder="Email adress"
								type="text"
								value={newEmail}
								onChange={(e) => dispatch(setNewEmail(e.target.value))}
							/>
						</div>
						<div>
							<input
								placeholder="Username"
								type="text"
								value={newUsername}
								onChange={(e) => dispatch(setNewUsername(e.target.value))}
							/>
						</div>
						<div>
							<input
								placeholder="Password"
								type="text"
								value={newPassword}
								onChange={(e) => dispatch(setNewPassword(e.target.value))}
							/>
						</div>
						<button type="submit">Sign up</button>
					</form>
				</div>
			</Notification>
			<div>
				Have an account? <Link to="/">Log in</Link>
			</div>
		</div>
	);
};

export default Register;
