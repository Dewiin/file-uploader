const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/login", indexController.loginGet);
indexRouter.post("/login", indexController.loginPost);
indexRouter.get("/sign-up", indexController.signupGet);
indexRouter.post("/sign-up", indexController.signupPost);

module.exports = indexRouter;
