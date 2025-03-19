/*
.\server\index.js

A JavaScript file containing code to work with the database
*/

// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
// const { Pool } = require("pg"); // PostgreSQL client for database interaction
require("dotenv").config(); // Load environment variables from .env file
//const { query } = require("./helpers/db.js");
const { todoRouter } = require("./routes/todo.js");

const app = express(); // Initialize Express application

app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: false }));
app.use("/", todoRouter);

const port = process.env.PORT || 10000; // Define the port number where the server will run

// Start the Express server and listen on the specified port
app.listen(port, () => {
	console.log(`Server running on port:${port}`);
	console.log(
		`DB_USER: ${process.env.DB_USER} \n Host: ${process.env.HOST} \n DB_NAME: ${process.env.DB_NAME} \n DB_PASSWORD: ${process.env.DB_PASSWORD} \n DB_PORT: ${process.env.DB_PORT} \n PORT: ${process.env.PORT} \n SSL: ${process.env.SSL}`
	);
	// Test the database connection by running a simple query
	pool.query("SELECT NOW()", (err, result) => {
		if (err) {
			console.error("Failed to connect to the database:", err.message);
		} else {
			console.log("Successfully connected to the database!");
			console.log("Current time from the database:", result.rows[0].now);
		}
	});
});
