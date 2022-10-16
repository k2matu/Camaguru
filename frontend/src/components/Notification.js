import { useSelector } from "react-redux";
import { forwardRef } from "react";

const Notification = forwardRef((props, ref) => {
	const notification = useSelector((state) => state.notification.notis);
	const visible = useSelector((state) => state.notification.visible);

	const hideWhenVisible = { display: visible ? "" : "none" };
	const showWhenVisible = { display: visible ? "none" : "" };

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
	};

	return (
		<>
			<div style={hideWhenVisible}>
				<div style={style}>{notification}</div>
			</div>
			<div style={showWhenVisible}>{props.children}</div>
		</>
	);
});

export default Notification;
