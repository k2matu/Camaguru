import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { notification } from "../../reducer/notificationReducer";
import { setUsers } from "../../reducer/userReducer";

import userService from "../../services/user";

import Notification from "../../components/Notification";
import Button from "../../components/Button";

const Profile = () => {
	const user = useSelector((state) => state.auth.user);
	const users = useSelector((state) => state.user);
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();

	const modify = async (data) => {
		var option = data.option;
		var value = data.value;

		switch (option) {
			case "email":
				if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
					dispatch(notification("Invalid email", 10));
					break;
				} else {
					userService
						.updateUser(user.id, { status: "Modified", email: value })
						.then((response) => {
							dispatch(
								setUsers(users.map((n) => (n.id !== user.id ? n : response)))
							);
						});
					break;
				}

			case "username":
				if (!value.match(/^\w{1,30}$/)) {
					dispatch(
						notification(
							"Username must be between one to 30 characters long",
							10
						)
					);
					break;
				} else {
					userService
						.updateUser(user.id, { status: "Modified", username: value })
						.then((response) => {
							dispatch(
								setUsers(users.map((n) => (n.id !== user.id ? n : response)))
							);
						});

					break;
				}

			case "password":
				if (
					!value.match(
						/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
					)
				) {
					dispatch(
						notification(
							"Password must be between eight to 15 characters long, contain atleast  one lowercase, one uppercase, one number and one special character.",
							10
						)
					);
					break;
				} else {
					userService.changePassword(user.id, { password: value });
					userService
						.updateUser(user.id, { status: "Modified" })
						.then((response) => {
							dispatch(
								setUsers(users.map((n) => (n.id !== user.id ? n : response)))
							);
						});
					break;
				}

			default:
				dispatch(notification("Select an option", 30));
		}
	};

	if (user) {
		return (
			<>
				<div> Please modify your username, mail address or password </div>
				<Notification></Notification>
				<form onSubmit={handleSubmit(modify)}>
					<select {...register("option")}>
						<option>Select</option>
						<option value="email">Email</option>
						<option value="username">Username</option>
						<option value="password">Password</option>
					</select>
					<input {...register("value", { required: true })} />
					<Button type="submit" name="Save" />
				</form>
			</>
		);
	}
};

export default Profile;
