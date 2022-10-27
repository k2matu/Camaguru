import { removing } from "../reducer/notificationReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Button = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(removing());
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{props.pretext} {""}
			<button type={props.type} onClick={props.onClick}>
				{props.name}
			</button>
		</div>
	);
};

export default Button;
