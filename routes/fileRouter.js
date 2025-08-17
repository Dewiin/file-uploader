const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "../public/uploads/" });

const fileController = require("../controllers/fileController");
const fileRouter = Router();

// Routes
fileRouter.post("/", upload.single("upload-file"), fileController.filePost);

module.exports = fileRouter;
