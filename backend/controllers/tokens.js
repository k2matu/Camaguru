const tokenRouter = require("express").Router();
const User = require("../models/user");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const nodemailer = require("../utils/nodemailer");
const config = require("../utils/config");

tokenRouter.get("/", async (request, response) => {
	const tokens = await Token.find({});

	response.json(tokens);
});

tokenRouter.get("/:confirmationCode", async (request, response) => {
	const token = await Token.findOne({
		token: request.params.confirmationCode,
	});

	if (token) {
		response.json(token);
	} else {
		response.status(404).end();
	}
});

tokenRouter.post("/", async (request, response) => {
	const { email, username, password } = request.body;

	const token = jwt.sign({ email, username }, config.SECRET, {
		expiresIn: 60 * 2,
	});
	const existingUser = await User.findOne({ email });

	const code = new Token({
		token,
		user: existingUser.id,
	});

	const savedCode = await code.save();

	response.status(201).json(savedCode);
	nodemailer.sendConfirmationEmail(username, email, token);
});

tokenRouter.delete("/:confirmationCode", async (request, response) => {
	await Token.findOneAndDelete({
		token: request.params.confirmationCode,
	});
	response.status(204).end();
});

tokenRouter.put("/:confirmationCode", (request, response, next) => {
	const { email, username, password } = request.body;

	const tokenForUser = {
		email,
		username,
	};

	const token = jwt.sign(tokenForUser, config.SECRET, { expiresIn: 60 * 60 });

	const confirmationCode = {
		token: token,
	};

	Token.findOneAndUpdate(
		{ token: request.params.confirmationCode },
		confirmationCode,
		{ new: true, runValidators: true, context: "query" }
	)
		.then((updatedToken) => {
			response.json(updatedToken);
		})
		.catch((error) => next(error));
});

module.exports = tokenRouter;
