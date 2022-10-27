const Header = (props) => {
	return (
		<>
			<h1>{props.text}</h1>
			<h3>{props.subtext}</h3>
		</>
	);
};

export default Header;
