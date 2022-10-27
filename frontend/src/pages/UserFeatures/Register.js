import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Link from "../../components/LinkTo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Notification from "../../components/Notification";

import { notification } from "../../reducer/notificationReducer";

import userService from "../../services/user";
import tokenService from "../../services/token";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const notificationRef = useRef();

	const addUser = async (data) => {
		const user = {
			email: data.email,
			username: data.username,
			password: data.password,
		};

		await userService.create(user);
		await tokenService.create(user);

		dispatch(
			notification(
				`User ${data.username} was created successfully! Please check your email`,
				60 * 2
			)
		);
	};

	return (
		<>
			<Header
				text="Camaguru"
				subtext="Sign up to see photos and videos from your friends."
			/>
			<Notification ref={notificationRef}>
				<form onSubmit={handleSubmit(addUser)}>
					<input
						placeholder="Email"
						{...register("email", {
							required: true,
							pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
						})}
					/>
					<p>{errors.email && "Invalid email"}</p>
					<input
						placeholder="Username"
						{...register("username", {
							required: true,
							pattern: /^\w{1,30}$/,
						})}
					/>
					<p>
						{errors.username &&
							"Username must be between one to 30 characters long"}
					</p>
					<input
						placeholder="Password"
						{...register("password", {
							required: true,
							pattern:
								/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
						})}
					/>
					<p>
						{errors.password &&
							"Password must be between eight to 15 characters long, contain atleast  one lowercase, one uppercase, one number and one special character."}
					</p>
					<Button type="submit" name="Sign up" />
				</form>
			</Notification>
			<Link to="/" name="Log In" />
		</>
	);
};

export default Register;
