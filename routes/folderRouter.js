const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();

// Routes
folderRouter.get("/", folderController.foldersGet);
folderRouter.post("/", folderController.foldersPost);

module.exports = folderRouter;
