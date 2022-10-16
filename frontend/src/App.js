import Path from "./components/Path";
import Logout from "./components/Logout";

const App = () => {
	return (
		<div>
			<div>
				{" "}
				<h2>header</h2> <Logout />
			</div>
			<Path />
			<h2>footer</h2>
		</div>
	);
};

export default App;
