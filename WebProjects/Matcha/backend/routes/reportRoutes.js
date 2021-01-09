const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require("../config/db");

// private add a report
router.post('/', auth,
	async (req, res) =>
	{
		try
		{
			const { recipient } = req.body;

			const sql = "INSERT INTO reports (sender, recipient) VALUES ($1, $2)";
			await pool.query(sql, [req.id, recipient]);

			res.json("report sent");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private list all reports
router.get('/list', auth,
	async (req, res) =>
	{
		try
		{
			let sql = "SELECT * FROM reports ORDER BY id DESC";
			const response = await pool.query(sql);

			sql = "UPDATE reports SET new = false";
			await pool.query(sql);

			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private delete all reports
router.delete("/", auth,
	async (req, res) =>
	{
		try
		{
			sql = "DELETE FROM reports";
			await pool.query(sql);

			res.json("all reports deleted");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private delete a report
router.delete("/:id", auth,
	async (req, res) =>
	{
		try
		{
			const { id } = req.params;

			const sql = "DELETE FROM reports WHERE id = $1";
			await pool.query(sql, [id]);

			res.json("report deleted");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

module.exports = router;