async function indexGet(req, res) {
	try {
		res.render("index");
	} catch (err) {
		console.error("Error rendering index page: ", err);
	}
}

async function loginGet(req, res) {
	try {
		res.render("login");
	} catch (err) {
		console.error("Error rendering login page: ", err);
	}
}

async function signupGet(req, res) {
	try {
		res.render("signup");
	} catch (err) {
		console.error("Error rendering sign-up page: ", err);
	}
}

module.exports = {
	indexGet,
	loginGet,
	signupGet
};
