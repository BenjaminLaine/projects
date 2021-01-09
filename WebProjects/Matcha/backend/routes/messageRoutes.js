const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require("../config/db");

// private list messages
router.get('/list/', auth,
	async (req, res) =>
	{
		try
		{
			const sql = "SELECT * FROM messages WHERE recipient = $1 ORDER BY id DESC";
			const response = await pool.query(sql, [req.id]);

			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private delete all messages
router.delete("/all/", auth,
	async (req, res) =>
	{
		try
		{
			const sql = "DELETE FROM messages WHERE recipient = $1";
			await pool.query(sql, [req.id])

			res.json("all messages deleted");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private delete a message
router.delete("/:id", auth,
	async (req, res) =>
	{
		try
		{
			const { id } = req.params;

			const sql = "DELETE FROM messages WHERE id = $1 AND recipient = $2";
			await pool.query(sql, [id, req.id]);

			res.json("message deleted");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private fetch last 50 messages of two users (in chat)
router.get('/chat/:id', auth,
	async (req, res) =>
	{
		try
		{
			const { id } = req.params;

			const sql = "SELECT * FROM messages WHERE sender = $1 AND recipient = $2 OR sender = $2 AND recipient = $1 ORDER BY created DESC LIMIT 50";
			const response = await pool.query(sql, [req.id, id]);
			
			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message); 
		}
	}
);

// private age messages
router.put("/age/", auth,
	async (req, res) =>
	{
		try
		{
			const sql = "UPDATE messages SET new = false WHERE recipient = $1";
			await pool.query(sql, [req.id]);

			res.json("messages aged");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

module.exports = router;