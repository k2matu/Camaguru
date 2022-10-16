import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import loginService from "../services/login";
import Notification from "./Notification";
import { notification } from "../reducer/notificationReducer";

const Home = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const users = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		const loginUser = window.localStorage.getItem("loginUser");
		if (loginUser) {
			const user = JSON.parse(loginUser);
			setUser(user);
		}
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const foundUser = users.find((n) => n.username === username);
			if (foundUser.status === "Active") {
				const identifiedUser = await loginService.login({
					username,
					password,
				});

				window.localStorage.setItem(
					"loginUser",
					JSON.stringify(identifiedUser)
				);

				setUser(identifiedUser);
				setUsername("");
				setPassword("");
			}
		} catch (error) {
			dispatch(notification("Wrong credentials"));
		}
	};
	return (
		<div>
			<h1>Welcome to Camaguru</h1>
			<Notification></Notification>
			<form onSubmit={handleLogin}>
				<div>
					<input
						placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="Password"
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Log In</button>
			</form>
			<Link to="/repassword">Forgotten your password?</Link>
			<br></br>
			Don't have an account? <Link to="/register">Sign up</Link>
		</div>
	);
};

export default Home;
