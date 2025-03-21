const express = require("express");
const { query } = require("../helpers/db.js");

const todoRouter = express.Router();

// Route to fetch all tasks from the database
todoRouter.get("/", async (req, res) => {
	console.log(query);
	try {
		const result = await query("SELECT * FROM task");
		const rows = result.rows ? result.rows : [];
		res.status(200).json(rows);
	} catch (error) {
		console.log(error);
		res.statusMessage = error;
		res.status(500).json({ error: error });
	}
});

// Route to add a new task to the database
todoRouter.post("/new", async (req, res) => {
	try {
		const result = await query("INSERT INTO task (description) values ($1) RETURNING *", [req.body.description]);
		res.status(200).json({ id: result.rows[0].id });
	} catch (error) {
		console.log(error);
		res.statusMessage = error;
		res.status(500).json({ error: error });
	}
});

todoRouter.delete("/delete/:id", async (req, res) => {
	const id = Number(req.params.id);
	try {
		const result = await query("DELETE FROM task WHERE id = $1", [id]);
		res.status(200).json({ id: id });
	} catch (error) {
		console.log(error);
		res.statusMessage = error;
		res.status(500).json({ error: error });
	}
});

// /test-db page, returns current db time
todoRouter.get("/test-db", async (req, res) => {
	try {
		// Run a simple query
		const result = await query("SELECT NOW()");
		const dbTime = result.rows[0].now;
		res.json({ message: "Database is accessible!", dbTime });
	} catch (error) {
		console.error("DB error:", error);
		res.status(500).json({ error: error.message });
	}
});

module.exports = { todoRouter };
