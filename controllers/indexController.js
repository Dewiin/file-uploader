async function indexGet(req, res) {
	try {
		res.render("index");
	} catch (err) {
		console.error("Error rendering index page: ", err);
	}
}

module.exports = {
	indexGet,
};
