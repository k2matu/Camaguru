const repassRouter = require("express").Router();
const Repass = require("../models/repass");
const User = require("../models/user");
const nodemailer = require("../utils/nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

repassRouter.get("/", async (request, response) => {
	const codes = await Repass.find({});

	response.json(codes);
});

repassRouter.get("/:code", async (request, response) => {
	const code = await Repass.findOne({
		code: request.params.code,
	});

	if (code) {
		response.json(code);
	} else {
		response.status(404).end();
	}
});

repassRouter.post("/", async (request, response) => {
	const { email } = request.body;

	const existingUser = await User.findOne({ email });

	if (existingUser.status === "Active") {
		const code = jwt.sign({ email }, config.SECRET, {
			expiresIn: 60 * 60,
		});

		const repass = new Repass({
			code,
			user: existingUser.id,
		});

		const savedCode = await repass.save();

		response.status(201).json(savedCode);
		nodemailer.sendRepassEmail(email, code);
	}
});

repassRouter.delete("/:code", async (request, response) => {
	await Repass.findOneAndDelete({ code: request.params.code });
	response.status(204).end();
});

module.exports = repassRouter;
