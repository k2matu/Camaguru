import axios from "axios";
const baseUrl = "http://localhost:3003/api/tokens";

const getAll = () => {
	return axios.get(baseUrl);
};

const getOne = (confirmationCode) => {
	return axios.get(`${baseUrl}/${confirmationCode}`);
};

const create = (newObject) => {
	return axios.post(baseUrl, newObject);
};

const remove = (confirmationCode) => {
	return axios.delete(`${baseUrl}/${confirmationCode}`);
};

// eslint-disable-next-line
export default {
	getAll,
	getOne,
	create,
	remove,
};
