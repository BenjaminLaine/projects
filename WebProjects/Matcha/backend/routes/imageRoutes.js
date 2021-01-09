const express = require('express');
const router = express.Router();
const fs = require('fs');
const pool = require("../config/db");
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

// enable access to files in public folder
router.use(express.static('../public'));

// private upload image
router.post('/upload', auth,
	async (req, res) =>
	{
		try
		{
			let { image } = req.body;

			let imageName = uuidv4() + ".png";
			let base64Image = image.split(';base64,').pop();

			// save image to server
			fs.writeFile("public/" + imageName, base64Image, { encoding: 'base64' }, (err) => { if (err) throw err; });

			const sql = "INSERT INTO images (name, owner) VALUES ($1, $2)";
			await pool.query(sql, ["http://localhost:5000/" + imageName, req.id]);

			res.json("image added to database");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// public list images of user
router.post('/gallery',
	async (req, res) =>
	{
		try
		{
			const { owner } = req.body;

			const sql = "SELECT * FROM images WHERE owner = $1";
			const response = await pool.query(sql, [owner]);

			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private delete image
router.delete("/:name", auth,
	async (req, res) =>
	{
		try
		{
			const { name } = req.params;

			const sql = "DELETE FROM images WHERE name = $1 AND owner = $2";
			await pool.query(sql, ["http://localhost:5000/" + name, req.id]);

			// delete image from server
			fs.unlink("public/" + name, (err) => { if (err) throw err; });

			res.json("image deleted");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private add image to profile
router.post("/setprofile", auth,
	async (req, res) =>
	{
		try
		{
			const { name } = req.body;

			// update profile image name in users table
			const sql = "UPDATE users SET profile_image = $1 WHERE id = $2";
			await pool.query(sql, [name, req.id]);

			res.json("profile image updated");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

module.exports = router;