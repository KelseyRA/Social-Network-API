const express = require("express");
const db = require("./config/connection");
const controllers = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(controllers);

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}`);
	});
});

// const cwd = process.cwd();

const { User, Thought, Reaction } = require("./models");