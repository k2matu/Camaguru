const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

usersRouter.get("/", async (request, response) => {
	const users = await User.find({});

	response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
	const user = await User.findById(request.params.id);

	if (user) {
		response.json(user);
	} else {
		response.status(404).end();
	}
});

usersRouter.post("/", async (request, response) => {
	const { email, username, password } = request.body;

	const existingEmail = await User.findOne({ email });
	const existingUser = await User.findOne({ username });
	if (existingUser || existingEmail) {
		return response.status(400).json({
			error: "username must be unique",
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		email,
		username,
		passwordHash,
	});

	const savedUser = await user.save();
	response.status(201).json(savedUser);
});

usersRouter.patch("/:id", async (request, response, next) => {
	const body = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	User.findOneAndUpdate(
		request.params.id,
		{ passwordHash: passwordHash },
		{
			new: true,
			runValidators: true,
			context: "query",
		}
	)
		.then((updatedUser) => {
			console.log(updatedUser);
			response.json(updatedUser);
		})
		.catch((error) => next(error));
});

usersRouter.put("/:id", (request, response, next) => {
	const body = request.body;

	const user = {
		username: body.username,
		email: body.email,
		status: body.status,
	};

	User.findByIdAndUpdate(request.params.id, user, {
		new: true,
		runValidators: true,
		context: "query",
	})
		.then((updatedUser) => {
			response.json(updatedUser);
		})
		.catch((error) => next(error));
});

module.exports = usersRouter;
