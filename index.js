const express = require("express");
const passport = require("passport");
const path = require("node:path");
const app = express();

const indexRouter = require("./routes/indexRouter");
const folderRouter = require("./routes/folderRouter");
const fileRouter = require("./routes/fileRouter");
const sessionConfig = require("./config/sessionConfig");
require("./config/passportConfig");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(sessionConfig);
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/folders", folderRouter);
app.use("/files", fileRouter);
app.use((req, res) => {
	res.status(404).render("404", {user: req.user});
});

// Run
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}!`));
