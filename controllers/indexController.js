const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prismaClient");

// Validators
const validateUserSignup = [
	body("username")
		.trim()
		.notEmpty()
		.withMessage("Username cannot be empty.")
		.matches(/^[a-zA-Z0-9]+$/)
		.withMessage("Username can only contain alphanumeric characters.")
		.custom(async (value) => {
			const user = await prisma.user.findFirst({
				where: {
					username: value,
				},
			});
			if (user) {
				throw new Error("Username already in use.");
			}
		}),
	body("password")
		.matches(/^[\S]+$/)
		.withMessage("Password cannot contain whitespace."),
	body("confirm-password").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Passwords do not match.");
		}
		return true;
	}),
];

const validateUserLogin = [
	body("username").custom(async (value) => {
		const user = await prisma.user.findFirst({
			where: {
				username: value,
			},
		});
		if (!user) {
			throw new Error("Username does not exist.");
		}
	}),
	body("password").custom(async (value, { req }) => {
		const username = req.body.username;
		const user = await prisma.user.findFirst({
			where: {
				username: username,
			},
		});
		if (!user) {
			throw new Error("Username or password is incorrect.");
		}
		const match = await bcrypt.compare(value, user.password);
		if (!match) {
			throw new Error("Username or password is incorrect.");
		}
	}),
];

/* Functions */

async function indexGet(req, res) {
	try {
		res.render("index");
	} catch (err) {
		console.error("Error rendering index page: ", err);
	}
}

// Log In
async function loginGet(req, res) {
	try {
		if (!req.user) {
			return res.render("login");
		}

		res.redirect("/");
	} catch (err) {
		console.error("Error rendering login page: ", err);
	}
}

async function loginPost(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.render("login", {
				errors: errors.array(),
			});
		}

		next();
	} catch (err) {
		console.error("Error verifying user login: ", err);
	}
}

// Sign Up
async function signupGet(req, res) {
	try {
		if (!req.user) {
			return res.render("signup");
		}

		res.redirect("/");
	} catch (err) {
		console.error("Error rendering sign-up page: ", err);
	}
}

async function signupPost(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.render("signup", {
				errors: errors.array(),
			});
		}

		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		await prisma.user.create({
			data: {
				username: username,
				password: hashedPassword,
			},
		});

		next();
	} catch (err) {
		console.error("Error verifying user signup: ", err);
	}
}

module.exports = {
	indexGet,
	loginGet,
	loginPost: [
		validateUserLogin,
		loginPost,
		passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/login",
		}),
	],
	signupGet,
	signupPost: [
		validateUserSignup,
		signupPost,
		passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/sign-up",
		}),
	],
};
