const prisma = require("../config/prismaClient");

// Helper
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

async function filePost(req, res) {
	try {
		const name = req.file.originalname;
		const size = formatBytes(req.file.size);
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
		const fileId = parseInt(req.params.fileId);

		const deletedFile = await prisma.file.delete({
			where: {
				id: fileId,
			}
		});

		if(deletedFile.folderId) {
			const parentFolder = await prisma.folder.findUnique({
				where: {
					id: deletedFile.folderId,
				}
			});

			return res.redirect(`/folders/${parentFolder.id}`);
		}

		res.redirect(`/folders`);
	} catch (err) {
		console.error(`Error deleting file from database: `, err);
	}
}

module.exports = {
	filePost,
	fileDelete
};
