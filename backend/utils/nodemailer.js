// const config = require("./config");
const logger = require("./logger");
nodemailer = require("nodemailer");

// const user = config.USER;
// const pass = config.PASS;

var transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "73a5e80fce4426",
		pass: "d78ba5e8467911",
	},
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
	transport
		.sendMail({
			from: "thecamaguruproject@gmail.com",
			to: email,
			subject: "Camaguru | Welcome to Camaguru",
			html: `<div> 
		<h1>Email confirmation</h1>
		<p>Hello ${name},</p>
		<p>Thank you for joining Camaguru! Please confirm your email by clicking on the following link:</p>
		<a href=http://localhost:3000/confirm/${confirmationCode}> Click here </a>
		</div>`,
		})
		.catch((err) => logger.error(err));
};
