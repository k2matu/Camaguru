import { useSelector } from "react-redux";

const Message = () => {
	const user = useSelector((state) => state.authUser);

	if (user) {
		return <div>Account confirmed </div>;
	} else {
		return <div></div>;
	}
};

export default Message;
