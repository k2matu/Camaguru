const setItem = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
	const response = localStorage.getItem(key);
	return response;
};

const removeItem = (key) => {
	localStorage.removeItem(key);
};

const clear = () => {
	localStorage.clear();
};

// eslint-disable-next-line
export default {
	setItem,
	getItem,
	removeItem,
	clear,
};
