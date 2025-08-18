const prisma = require('../config/prismaClient');

async function foldersGet(req, res) {
	try {
		if (!req.user) {
			return res.redirect("/login");
		}

		const userId = req.user.id;

		const userFolders = await prisma.folder.findMany({
			where: {
				userId: userId
			}
		});

		res.render("index", { user: req.user, userFolders: userFolders });
	} catch (err) {
		console.error(`Error retrieving folders: `, err);
	}
}

async function foldersPost(req, res) {
	try {
		const folderName = req.body['folder-name'];
		const userId = req.user.id;
		const parentId = (req.params.userId ? req.params.userId : null);

		await prisma.folder.create({
			data: {
				name: folderName,
				userId: userId,
				parentId: parentId
			}
		});

		res.redirect('/');
	} catch (err) {
		console.error(`Error adding folder to database: `, err);
	}
}

module.exports = {
	foldersGet,
	foldersPost,
};
