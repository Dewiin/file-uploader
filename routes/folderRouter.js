const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();

// Get
folderRouter.get("/", folderController.foldersGet);
folderRouter.get("/:folderId", folderController.foldersGet);
folderRouter.get("/:folderId/delete", folderController.foldersDelete);

// Post
folderRouter.post("/", folderController.foldersPost);
folderRouter.post("/:folderId", folderController.foldersPost);
folderRouter.post("/edit/:folderId", folderController.foldersUpdate);

module.exports = folderRouter;
