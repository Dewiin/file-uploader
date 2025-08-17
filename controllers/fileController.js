function filePost(req, res) {
	try {
		console.log(req.file);

		return res.redirect("/");
	} catch (err) {
		console.error(`Error uploading file: `, err);
	}
}

module.exports = {
	filePost,
};
