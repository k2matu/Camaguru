import { useNavigate } from "react-router-dom";

const RePassword = () => {
	const navigate = useNavigate();

	const resend = () => {
		console.log("sa");
	};

	return (
		<div>
			<h2>Find your account</h2>
			<p>Please enter your email to send a password reinitialisation mail.</p>
			<input type="text" placeholder="Email" />
			<div>
				<button onClick={() => navigate("/")}>Cancel </button>{" "}
				<button onClick={resend}>Resend </button>
			</div>
		</div>
	);
};

export default RePassword;
