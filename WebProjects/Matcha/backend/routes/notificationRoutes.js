const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require("../config/db");

// List Notifications
router.get('/list', auth,
	async (req, res) =>
	{
		try
		{
			const sql = "SELECT * FROM notifications WHERE recipient = $1 ORDER BY id DESC";
			const response = await pool.query(sql, [req.id]);

			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// Delete all notifications
router.delete("/all", auth,
	async (req, res) =>
	{
		try 
		{
			const sql = "DELETE FROM notifications WHERE recipient = $1";
			await pool.query(sql, [req.id]);

			res.json("all notifications deleted");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// Delete notification
router.delete("/:id", auth,
	async (req, res) =>
	{
		try
		{
			const { id } = req.params;

			const sql = "DELETE FROM notifications WHERE id = $1 AND recipient = $2";
			await pool.query(sql, [id, req.id]);

			res.json("notification deleted");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// Age notifications
router.put("/age", auth,
	async (req, res) =>
	{
		try
		{
			const sql = "UPDATE notifications SET new = false WHERE recipient = $1";
			await pool.query(sql, [req.id])

			res.json("notification aged");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

module.exports = router;