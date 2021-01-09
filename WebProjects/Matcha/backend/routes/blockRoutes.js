const express = require('express');
const router = express.Router();
const pool = require("../config/db");
const auth = require('../middleware/auth');

// private toggle block
router.post('/', auth,
	async (req, res) =>
	{
		try
		{
			const { recipient } = req.body;

			// fetch previous block data (if any)
			let sql = "SELECT * FROM blocks WHERE sender = $1 AND recipient = $2";
			const response = await pool.query(sql, [req.id, recipient]);

			// has not been blocked earlier
			if (response.rowCount === 0)
			{
				sql = "INSERT INTO blocks (sender, recipient) VALUES ($1, $2)";
				await pool.query(sql, [req.id, recipient]);
				
				res.json("block added");
			}
			// has been blocked earlier
			else
			{
				sql = "DELETE FROM blocks WHERE sender = $1 AND recipient = $2"
				await pool.query(sql, [req.id, recipient]);
				
				res.json("block removed");
			}
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private find out if sender has blocked recipient
router.post('/haveblocked/', auth,
	async (req, res) =>
	{
		try
		{
			const { sender, recipient } = req.body;

			let sql = "SELECT * FROM blocks WHERE sender = $1 AND recipient = $2";
			const response = await pool.query(sql, [sender, recipient]);

			res.json(response.rowCount)
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private list all blocks of logged in user
router.get('/list/', auth,
	async (req, res) =>
	{
		try
		{
			let sql = "SELECT * FROM blocks WHERE sender = $1";
			const response = await pool.query(sql, [req.id]);

			res.json(response.rows)
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

module.exports = router;