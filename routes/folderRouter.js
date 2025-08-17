const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();

// Routes
folderRouter.get("/", folderController.foldersGet);

module.exports = folderRouter;
