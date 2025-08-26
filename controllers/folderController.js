const prisma = require("../config/prismaClient");

// Helpers
async function getFolderWithSubfolders(parentId, userId) {
	try {
		const userFolders = await prisma.folder.findMany({
			where: {
				userId,
				parentId,
			},
			include: {
				subfolders: true,
			},
		});

		if (!userFolders) {
			return null;
		}

		return await Promise.all(
			userFolders.map(async (folder) => {
				folder.subfolders = await getFolderWithSubfolders(folder.id, userId);
				return folder;
			}),
		);
	} catch (err) {
		console.error(`Error retrieving root folder with all subfolders: `, err);
		return [];
	}
}

async function getBreadcrumbFolders(parentId, userId, result = []) {
	try {
		if (!parentId) {
			return result;
		}

		const parentFolder = await prisma.folder.findUnique({
			where: {
				userId,
				id: parentId,
			},
		});

		result.push(parentFolder);
		return await getBreadcrumbFolders(parentFolder.parentId, userId, result);
	} catch (err) {
		console.error(`Error retrieving parent folders for breadcrumb: `, err);
		return [];
	}
}

// Read
async function foldersGet(req, res) {
	try {
		if (!req.user) {
			return res.redirect("/login");
		}

		const userId = req.user.id;
		let folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

		const userFolders = await getFolderWithSubfolders(null, userId);
		const breadcrumbFolders = await getBreadcrumbFolders(folderId, userId);

		const userFiles = await prisma.file.findMany({
			where: {
				folderId,
			},
		});
		const subfolders = await prisma.folder.findMany({
			where: {
				userId,
				parentId: folderId,
			},
		});

		if (!folderId) {
			folderId = "";
		}

		res.render("index", {
			user: req.user,
			userFolders,
			breadcrumbFolders,
			folderId,
			userFiles,
			subfolders,
		});
	} catch (err) {
		console.error(`Error retrieving folders: `, err);
	}
}

// Create
async function foldersPost(req, res) {
	try {
		const folderName = req.body["folder-name"];
		const userId = req.user.id;
		let parentId = req.params.folderId ? parseInt(req.params.folderId) : null;

		await prisma.folder.create({
			data: {
				name: folderName,
				userId,
				parentId,
			},
		});

		if (!parentId) {
			parentId = "";
		}

		res.redirect(`/folders/${parentId}`);
	} catch (err) {
		console.error(`Error adding folder to database: `, err);
	}
}

// Delete
async function foldersDelete(req, res) {
	try {
		const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

		const deletedFolder = await prisma.folder.delete({
			where: {
				id: folderId,
			},
		});

		const closestSibling = await prisma.folder.findFirst({
			where: {
				userId: req.user.id,
				parentId: deletedFolder.parentId,
			},
			orderBy: {
				id: "desc",
			},
		});

		if (closestSibling) {
			return res.redirect(`/folders/${closestSibling.id}`);
		}
		res.redirect(`/folders`);
	} catch (err) {
		console.error(`Error deleting folder from database: `, err);
	}
}

// Update
async function foldersUpdate(req, res) {
	try {
		const newFolderName = req.body["folder-name"];
		const folderId = parseInt(req.params.folderId);

		await prisma.folder.update({
			where: {
				id: folderId,
			},
			data: {
				name: newFolderName,
			},
		});

		res.redirect(`/folders/${folderId}`);
	} catch (err) {
		console.error(`Error updating folder in database: `, err);
	}
}

module.exports = {
	foldersGet,
	foldersPost,
	foldersDelete,
	foldersUpdate,
};
