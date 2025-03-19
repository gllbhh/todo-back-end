/*
.\server\index.js

A JavaScript file containing code to work with the database
*/

// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
// const { Pool } = require("pg"); // PostgreSQL client for database interaction
require("dotenv").config(); // Load environment variables from .env file
const { query, openDb } = require("./helpers/db.js");
const { todoRouter } = require("./routes/todo.js");

const app = express(); // Initialize Express application

app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: false }));
app.use("/", todoRouter);

const port = process.env.PORT || 3000; // Define the port number where the server will run

// OPTIONAL: Example route that uses the 'query' helper
app.get("/test-db", async (req, res) => {
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

// Test the DB connection at startup
const testDbConnection = async () => {
	try {
		// This uses the 'query' function to confirm DB is reachable
		const result = await query("SELECT NOW()");
		console.log("Successfully connected to DB!");
		console.log("Current time in the DB is:", result.rows[0].now);
	} catch (error) {
		console.error("DB connection failed:", error);
	}
};

// Start the Express server and listen on the specified port
app.listen(port, () => {
	console.log(`Server running on port:${port}`);
	// Test the database connection by running a simple query
	testDbConnection();
});
