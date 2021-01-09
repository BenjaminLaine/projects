const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require("../config/db");

// private fetch all tags and owners
router.get('/', auth,
	async (req, res) =>
	{
		try
		{
			const sql = "SELECT owner, name FROM tags WHERE owner != $1 ORDER BY owner";
			const response = await pool.query(sql, [req.id]);

			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private fetch unique tag names and count
router.get('/unique/', auth,
	async (req, res) =>
	{
		try
		{
			const sql = "SELECT name, COUNT(*) FROM tags WHERE owner != $1 GROUP BY name ORDER BY name";
			const response = await pool.query(sql, [req.id]);

			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private fetch users who have at least one same tag as logged in user
router.get('/sametags/', auth,
	async (req, res) =>
	{
		try
		{
			const sql = "SELECT owner, name FROM tags WHERE owner != $1 AND name IN (SELECT name FROM tags WHERE owner = $1) ORDER BY owner";
			const response = await pool.query(sql, [req.id]);

			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private fetch all tags of a user
router.get('/:id',
	async (req, res) =>
	{
		try
		{
			const { id } = req.params;

			const sql = "SELECT id, name FROM tags WHERE owner = $1";
			const response = await pool.query(sql, [id]);

			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// pprivate add a tag to user
router.post("/add", auth,
	async (req, res) =>
	{
		try
		{
			const { name } = req.body;

			let sql = "INSERT INTO tags (owner, name) VALUES ($1, $2) ON CONFLICT DO NOTHING";
			await pool.query(sql, [req.id, name]);

			res.json("tag added");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private delete a tag from a user
router.delete("/:id", auth,
	async (req, res) =>
	{
		try
		{
			const { id } = req.params;

			let sql = "DELETE FROM tags WHERE id = $1";
			await pool.query(sql, [id]);

			res.json("tag deleted");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

module.exports = router;