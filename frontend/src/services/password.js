import axios from "axios";
const baseUrl = "http://localhost:3003/api/repass";

const getAll = () => {
	return axios.get(baseUrl);
};

const getOne = (code) => {
	return axios.get(`${baseUrl}/${code}`);
};

const create = (email) => {
	return axios.post(baseUrl, email);
};

const remove = (code) => {
	return axios.delete(`${baseUrl}/${code}`);
};

// eslint-disable-next-line
export default {
	getAll,
	getOne,
	create,
	remove,
};
