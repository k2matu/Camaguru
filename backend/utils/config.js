require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const USER = process.env.USER;
const PASS = process.env.PASS;

module.exports = {
	PORT,
	MONGODB_URI,
	SECRET,
	USER,
	PASS,
};
