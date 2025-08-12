const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prismaClient");

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
		res.render("login");
	} catch (err) {
		console.error("Error rendering login page: ", err);
	}
}

async function loginPost(req, res, next) {
	try {
		console.log(req.body);
		const {username, password} = req.body;


	} catch (err) {
		console.error("Error posting login information: ", err);
	}
}

// Sign Up
async function signupGet(req, res) {
	try {
		res.render("signup");
	} catch (err) {
		console.error("Error rendering sign-up page: ", err);
	}
}

async function signupPost(req, res, next) {
	try {

	} catch (err) {
		console.error("Error posting sign-up information: ", err);
	}
}

module.exports = {
	indexGet,
	loginGet,
	loginPost,
	signupGet,
	signupPost
};
