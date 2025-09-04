const prisma = require("../config/prismaClient");
const supabase = require("../config/supabaseClient");

// Helper
function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return (
		parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
	);
}

async function filePost(req, res) {
	let folderId = req.params.folderId ? parseInt(req.params.folderId) : null;
	try {
		const name = req.file.originalname;
		const size = formatBytes(req.file.size);

		// Supabase
		const filePath = `${folderId}/${name}`;
		const {data, error} = await supabase.storage
		.from("Drive")
		.upload(filePath, req.file.buffer, {
			contentType: req.file.mimetype,
			upsert: false
		});
		if (error) {
			console.error(`Error uploading file: `, error);
			return res.redirect(`/folders/${folderId}?type=file&action=create&status=error`);
		} 

		// Construct public URL
		const { data: publicUrlData } = supabase.storage
		.from("Drive")
		.getPublicUrl(filePath);	

		await prisma.file.create({
			data: {
				name,
				size,
				url: publicUrlData.publicUrl,
				folderId,
			},
		});

		if (!folderId) {
			folderId = "";
		}

		res.redirect(`/folders/${folderId}?type=file&action=create&status=success`);
	} catch (err) {
		if (!folderId) {
			folderId = "";
		}
		console.error(`Error uploading file: `, err);
		res.redirect(`/folders/${folderId}?type=file&action=create&status=error`);
	}
}

async function fileDelete(req, res) {
	try {
		const fileId = parseInt(req.params.fileId);

		const deletedFile = await prisma.file.delete({
			where: {
				id: fileId,
			},
		});

		const filePath = `null/${deletedFile.name}`;
		if (deletedFile.folderId) {
			// Supabase
			filePath = `${deletedFile.folderId}/${deletedFile.name}`;
			await supabase.storage.from("Drive").remove([filePath]);

			const parentFolder = await prisma.folder.findUnique({
				where: {
					id: deletedFile.folderId,
				},
			});

			return res.redirect(`/folders/${parentFolder.id}?type=file&action=delete&status=success`);
		}

		await supabase.storage.from("Drive").remove([filePath]);
		res.redirect(`/folders?type=file&action=delete&status=success`);
	} catch (err) {
		console.error(`Error deleting file from database: `, err);
		res.redirect(`/folders?type=file&action=delete&status=error`);
	}
}

module.exports = {
	filePost,
	fileDelete,
};
