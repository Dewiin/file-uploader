const { Router } = require("express");
const shareController = require("../controllers/shareController");
const shareRouter = Router();

shareRouter.get("/:shareId", shareController.shareFolderGet);
shareRouter.post("/", shareController.shareFolderPost);

module.exports = shareRouter;