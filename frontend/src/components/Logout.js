import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();
	const logout = () => {
		window.localStorage.clear();
		navigate("/");
	};

	return (
		<div>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default Logout;
