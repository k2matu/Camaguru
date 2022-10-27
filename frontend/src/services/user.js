import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";

const getAll = () => {
	return axios.get(baseUrl);
};

const create = (newObject) => {
	return axios.post(baseUrl, newObject);
};

const remove = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};

const updateUser = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

const changePassword = (id, newObject) => {
	const request = axios.patch(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

// eslint-disable-next-line
export default {
	getAll,
	create,
	remove,
	updateUser,
	changePassword,
};
