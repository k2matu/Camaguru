import { useNavigate } from "react-router-dom";

import localstorage from "../services/localstorage";
import { useSelector, useDispatch } from "react-redux";
import { clear } from "../reducer/authReducer";

import Button from "./Button";

const Logout = () => {
	const authUser = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logout = () => {
		localstorage.clear();
		dispatch(clear());
		navigate("/");
	};

	if (authUser) return <Button onClick={logout} name="Logout" />;
};

export default Logout;
