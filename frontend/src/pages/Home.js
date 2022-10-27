import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Link from "../components/LinkTo";
import Header from "../components/Header";
import Notification from "../components/Notification";

import loginService from "../services/login";
import localstorageService from "../services/localstorage";

import { notification } from "../reducer/notificationReducer";
import { setAuth } from "../reducer/authReducer";

const Home = () => {
	const users = useSelector((state) => state.user);
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (data) => {
		try {
			const user = users.find((n) => n.username === data.username);
			if (user.status === "Active" || user.status === "Modified") {
				const username = data.username;
				const password = data.password;
				const identifiedUser = await loginService.login({
					username,
					password,
				});

				if (identifiedUser) {
					localstorageService.setItem("loginUser", user);
					dispatch(setAuth(user));
					navigate("/profile");
				}
			} else {
				dispatch(
					notification(
						"Account not confirmed. Please check your email to confirm the account.",
						60
					)
				);
			}
		} catch (error) {
			dispatch(notification("Wrong credentials!", 60));
		}
	};

	return (
		<>
			<Header text="Welcome to Camaguru" />
			<Notification></Notification>
			<form onSubmit={handleSubmit(handleLogin)}>
				<input
					placeholder="Username"
					{...register("username", {
						required: true,
					})}
				/>
				<br />
				<input
					placeholder="Password"
					{...register("password", {
						required: true,
					})}
				/>
				<Button type="submit" name="Log In" />
			</form>
			<Link to="/resend" name="Forgotten your password?" />
			<Link pretext="Don't have an account?" to="/register" name="Sign up" />
		</>
	);
};

export default Home;
