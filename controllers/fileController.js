const prisma = require("../config/prismaClient");

async function filePost(req, res) {
	try {
		const name = req.file.originalname;
		const size = req.file.size * Math.pow(2, -20);
		const url = req.file.path;
		let folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

		await prisma.file.create({
			data: {
				name,
				size,
				url,
				folderId,
			},
		});

		if (!folderId) {
			folderId = "";
		}

		return res.redirect(`/folders/${folderId}`);
	} catch (err) {
		console.error(`Error uploading file: `, err);
	}
}

async function fileDelete(req, res) {
	try {

	} catch (err) {
		console.error(`Error deleting file from database: `, err);
	}
}

module.exports = {
	filePost,
	fileDelete
};
