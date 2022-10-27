import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Notification from "../../../components/Notification";

import repassService from "../../../services/password";

import { notification, removing } from "../../../reducer/notificationReducer";

const Resend = () => {
	const users = useSelector((state) => state.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const resend = async (data) => {
		const user = await users.find((n) => n.email === data.email);

		if (user.status === "Active") {
			const email = data.email;
			await repassService.create({ email });
			dispatch(
				notification(
					`Successfully sent a password reinitialisation mail`,
					60 * 1
				)
			);
			setTimeout(() => {
				removing();
				navigate("/");
			}, 1000 * 60);
		}
	};

	return (
		<>
			<Header
				text="Find your account"
				subtext="Please enter your email to send a password reinitialisation mail"
			/>
			<Notification>
				<form onSubmit={handleSubmit(resend)}>
					<input
						placeholder="Email"
						{...register("email", {
							required: true,
							pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
						})}
					/>
					<p>{errors.email && "Invalid email"}</p>
					<div>
						<Button type="button" onClick={() => navigate("/")} name="Cancel" />
						<Button type="submit" value="Submit" name="Resend" />
					</div>
				</form>
			</Notification>
		</>
	);
};

export default Resend;
