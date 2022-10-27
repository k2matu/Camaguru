import { Link } from "react-router-dom";
import { removing } from "../reducer/notificationReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LinkTo = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(removing());
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{props.pretext} <Link to={props.to}>{props.name}</Link>
		</div>
	);
};

export default LinkTo;
