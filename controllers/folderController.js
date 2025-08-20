const prisma = require('../config/prismaClient');

async function foldersGet(req, res) {
	try {
		if (!req.user) {
			return res.redirect("/login");
		}

		const userId = req.user.id;

		const userFolders = await prisma.folder.findMany({
			where: {
				userId,
				parentId: null
			},
			include: {
				subfolders: true
			}
		});

		let { folderId } = req.params;
		if(!folderId) {
			folderId = "";
		}

		res.render("index", { user: req.user, userFolders, folderId });
	} catch (err) {
		console.error(`Error retrieving folders: `, err);
	}
}

async function foldersPost(req, res) {
	try {
		const folderName = req.body['folder-name'];
		const userId = req.user.id;
		let parentId = (req.params.folderId ? parseInt(req.params.folderId) : null);

		await prisma.folder.create({
			data: {
				name: folderName,
				userId,
				parentId,
			}
		});
		
		if(!parentId) {
			parentId = "";
		}

		res.redirect(`/folders/${parentId}`);
	} catch (err) {
		console.error(`Error adding folder to database: `, err);
	}
}

async function foldersDelete(req, res) {
	try {
		const folderId = (req.params.folderId ? parseInt(req.params.folderId) : null);


		const deletedFolder = await prisma.folder.delete({
			where: {
				id: folderId
			}
		});

		const closestSibling = await prisma.folder.findFirst({
			where: {
				userId: req.user.id,
				parentId: deletedFolder.parentId,
			},
			orderBy: {
				id: "desc"
			}
		});

		if (closestSibling) {
			return res.redirect(`/folders/${closestSibling.id}`);
		}
		res.redirect(`/folders`);
	} catch (err) {
		console.error(`Error deleting folder from database: `, err);
	}
}

module.exports = {
	foldersGet,
	foldersPost,
	foldersDelete
};
