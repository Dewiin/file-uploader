const express = require("express");
const path = require("node:path");
const app = express();

const indexRouter = require("./routes/indexRouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use((req, res) => {
	res
		.status(404)
		.render("404");
});

// Run
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}!`));
