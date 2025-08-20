const prisma = require('../config/prismaClient');

async function foldersGet(req, res) {
	try {
		if (!req.user) {
			return res.redirect("/login");
		}

		const userId = req.user.id;

		const userFolders = await prisma.folder.findMany({
			where: {
				userId: userId,
				parentId: null
			},
			include: {
				subfolders: true
			}
		});

		const { folderId } = req.params;

		res.render("index", { user: req.user, userFolders, folderId });
	} catch (err) {
		console.error(`Error retrieving folders: `, err);
	}
}

async function foldersPost(req, res) {
	try {
		const folderName = req.body['folder-name'];
		const userId = req.user.id;
		const parentId = (req.params.folderId ? req.params.folderId : null);

		await prisma.folder.create({
			data: {
				name: folderName,
				userId: userId,
				parentId: parseInt(parentId)
			}
		});

		res.redirect(`/folders/${parentId}`);
	} catch (err) {
		console.error(`Error adding folder to database: `, err);
	}
}

async function foldersDelete(req, res) {
	try {
		const {folderId} = req.params;

		await prisma.folder.delete({
			where: {
				id: parseInt(folderId)
			}
		});

		res.redirect("/")
	} catch (err) {
		console.error(`Error deleting folder from database: `, err);
	}
}

module.exports = {
	foldersGet,
	foldersPost,
	foldersDelete
};
