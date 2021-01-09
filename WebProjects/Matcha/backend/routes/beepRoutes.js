const express = require('express');
const router = express.Router();
const pool = require("../config/db");
const auth = require('../middleware/auth');

// private toggle beep
router.post('/', auth,
	async (req, res) =>
	{
		try
		{
			const { recipient } = req.body;

			// fetch previous beep data (if any)
			let sql = "SELECT * FROM beeps WHERE sender = $1 AND recipient = $2";
			let response = await pool.query(sql, [req.id, recipient]);

			// has not beeped before
			if (response.rowCount === 0)
			{
				// add beep
				sql = "INSERT INTO beeps (sender, recipient) VALUES ($1, $2)";
				await pool.query(sql, [req.id, recipient]);

				// increase fame
				sql = "UPDATE users SET fame = fame + 1 WHERE id = $1";
				await pool.query(sql, [recipient])
				
				res.json("beep added");
			}
			// has beeped before
			else
			{
				// remove beep
				sql = "DELETE FROM beeps WHERE sender = $1 AND recipient = $2"
				await pool.query(sql, [req.id, recipient]);

				// decrease fame
				sql = "UPDATE users SET fame = fame - 1 WHERE id = $1";
				await pool.query(sql, [recipient])

				res.json("beep removed");
			}
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private find out if sender has beeped recipient
router.post('/havebeeped', auth,
	async (req, res) =>
	{
		try
		{
			const { sender, recipient } = req.body;

			// fetch previous beep data (if any)
			let sql = "SELECT * FROM beeps WHERE sender = $1 AND recipient = $2";
			const response = await pool.query(sql, [sender, recipient]);

			// return 1 or 0
			res.json(response.rowCount)
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

module.exports = router;