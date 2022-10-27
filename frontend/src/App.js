import Path from "./pages/Path";

import Logout from "./components/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";

import localstorage from "./services/localstorage";

import { setAuth } from "./reducer/authReducer";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const loginUser = localstorage.getItem("loginUser");
		if (loginUser) {
			const user = JSON.parse(loginUser);
			dispatch(setAuth(user));
		}
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Header text="header" /> <Logout />
			<Path />
			<Footer text="footer" />
		</>
	);
};

export default App;
