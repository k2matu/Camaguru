const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const usersRouter = require("./controllers/users");
const tokenRouter = require("./controllers/tokens");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB", error.message);
	});

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/users", usersRouter);
app.use("/api/tokens", tokenRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
