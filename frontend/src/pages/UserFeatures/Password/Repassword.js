import { useJwt } from "react-jwt";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { notification } from "../../../reducer/notificationReducer";

import Button from "../../../components/Button";
import Notification from "../../../components/Notification";
import Header from "../../../components/Header";

import repassService from "../../../services/password";
import userService from "../../../services/user";

const Repassword = () => {
	const [code, setCode] = useState("");
	const users = useSelector((state) => state.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const paramCode = useParams().code;
	const { isExpired } = useJwt(paramCode);

	useEffect(() => {
		repassService.getOne(paramCode).then((response) => {
			setCode(response.data);
		});
	}, [paramCode]);

	const user = users.find((user) => user.id === code.user);

	const createPassword = async (data) => {
		if (user) {
			await userService.changePassword(user.id, { password: data.password });
			await repassService.remove(code.code);
			setCode("");
			dispatch(notification(`Successfully changed new password`, 60));
			setTimeout(() => {
				navigate("/");
			}, 1000 * 60);
		}
	};

	if (isExpired) {
		return <div>Code is invalid or expired</div>;
	} else {
		return (
			<>
				<Header text="Choose a New Password" />
				<Notification>
					<p>
						Create a password that is between 8-15 characters which contain at
						least one lowercase letter, one uppercase letter, one numeric digit
						and one special character"
					</p>
					<form onSubmit={handleSubmit(createPassword)}>
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
						<Button type="submit" name="Submit" />
					</form>
				</Notification>
			</>
		);
	}
};

export default Repassword;
