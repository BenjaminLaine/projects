const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
var faker = require('faker');
faker.locale = "sv";
const pool = require("../config/db");
const auth = require('../middleware/auth');

// public data of all users
router.get('/nonfiltered', auth,
	async (req, res) =>
	{
		try
		{
			let sql = "SELECT id, username, profile_image, latitude, longitude FROM users";
			let response = await pool.query(sql)

			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// public data of all users
router.get('/', auth,
	async (req, res) =>
	{
		try
		{
			// fetch logged in user sexuality and gender
			let sql = "SELECT sexuality, gender FROM users WHERE id = $1";
			let response = await pool.query(sql, [req.id])

			const user = response.rows[0];

			// remove logged in user, blocked users, users with the same gender and homosexuals
			if (user.sexuality === 1)
			{
				sql = "SELECT id, username, location, profile_image, latitude, longitude, first_name, last_name, age, gender, sexuality, bio, fame, online, last_seen, created FROM users \
					WHERE id != $1 AND gender != $2 AND sexuality != 2 AND id NOT IN (SELECT recipient FROM blocks WHERE sender = $1) ORDER BY fame DESC"
				response = await pool.query(sql, [req.id, user.gender]);
			}
			// remove logged in user, blocked users, users with the opposite gender and heterosexuals
			else if (user.sexuality === 2)
			{
				sql = "SELECT id, username, location, profile_image, latitude, longitude, first_name, last_name, age, gender, sexuality, bio, fame, online, last_seen, created FROM users \
					WHERE id != $1 AND (gender = $2 OR gender = 3 OR $2 = 3) AND sexuality != 1 AND id NOT IN (SELECT recipient FROM blocks WHERE sender = $1) ORDER BY fame DESC";
				response = await pool.query(sql, [req.id, user.gender]);
			}
			// remove logged in user and blocked users
			else
			{
				sql = "SELECT id, username, location, profile_image, latitude, longitude, first_name, last_name, age, gender, sexuality, bio, fame, online, last_seen, created FROM users \
					WHERE id != $1 AND id NOT IN (SELECT recipient FROM blocks WHERE sender = $1) ORDER BY fame DESC";
				response = await pool.query(sql, [req.id]);
			}
			res.json(response.rows);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private profile info
router.get('/private/', auth,
	async (req, res) =>
	{
		try
		{
			const sql = "SELECT * FROM users WHERE id = $1";
			const response = await pool.query(sql, [req.id])

			res.json(response.rows[0]);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// public profile info
router.get('/profile/:id',
	async (req, res) =>
	{
		try
		{
			let { id } = req.params;

			const sql = "SELECT id, username, location, profile_image, latitude, longitude, first_name, last_name, age, gender, sexuality, bio, fame, online, last_seen, created, admin FROM users WHERE id = $1";
			const response = await pool.query(sql, [id])

			res.json(response.rows[0]);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private add 100 random fake users to database
router.post('/random/',
	async (req, res) =>
	{
		const password = "12345678";
		const salt = await bcrypt.genSalt(10);
		const passwordEncrypted = await bcrypt.hash(password, salt);

		for (let i = 0; i < 100; i++)
		{
			const username = faker.internet.userName();
			const email = faker.internet.email();
			const city = faker.address.city();
			let profile_image = faker.image.avatar();
			const first_name = faker.name.firstName();
			const last_name = faker.name.lastName();
			const age = faker.random.number({ min:18, max:50});
			const gender = faker.random.arrayElement(
					[1, 1, 1, 1, 1, 2, 2, 2, 2, 3]
				);
			const sexuality = faker.random.arrayElement(
					[1, 1, 1, 1, 1, 1, 1, 2, 3, 3]
				);
			
			var tags = [];
			for (let i = 0; tags.length < 3; i++)
			{
				const randomTag = faker.random.arrayElement(
					["football", "icehockey", "partying", "pizza", "traveling",
					"cats","dogs","fishing","music", "food",
					"reading", "gaming", "anime", "fashion", "love",
					"computers","cars","fitness","movies", "sex"]
				);

				if (tags.indexOf(randomTag) === -1)
					tags.push(randomTag);
			}

			const bio = faker.random.words(20);
			const fame = faker.random.number({ min:0, max:1000});
			const created = faker.date.past(5);
			const latitude = Number(faker.address.latitude());
			const longitude = Number(faker.address.longitude());
			
			try
			{
				let sql = "INSERT INTO users (username, email, password, location, profile_image, latitude, longitude, first_name, last_name, age, gender, sexuality, bio, fame, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id";
				const returning = await pool.query(sql, [username, email, passwordEncrypted, city, profile_image, latitude, longitude, first_name, last_name, age, gender, sexuality, bio, fame, created])

				for (let i = 0; i < tags.length; i++)
				{
					const sql = "INSERT INTO tags (owner, name) VALUES ($1, $2)";
					await pool.query(sql, [returning.rows[0].id, tags[i]])
				}
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
		res.json("100 users created");
	}
);

// private update location
router.put('/location/', auth,
	async (req, res) =>
	{
		try
		{
			const { location, latitude, longitude } = req.body;

			const sql = "UPDATE users SET location = $1, latitude = $2, longitude = $3 WHERE id = $4";
			await pool.query(sql, [location, latitude, longitude, req.id])
			
			res.json("location, latitude and longitude updated");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private update user data
router.put('/data/', auth,
	async (req, res) =>
	{
		try
		{
			const { email, firstName, lastName, age, gender, sexuality, bio } = req.body;

			const sql = "UPDATE users SET email = $1, first_name = $2, last_name = $3, age = $4, gender = $5, sexuality = $6, bio = $7 WHERE id = $8";
			await pool.query(sql, [email, firstName, lastName, age, gender, sexuality, bio, req.id])
			
			res.json("user data updated");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private change password
router.put('/changepassword/', auth,
	async (req, res) =>
	{
		try
		{
			const { currentPassword, newPassword } = req.body;

			let sql = "SELECT password FROM users WHERE id = $1";
			const response = await pool.query(sql, [req.id])

			const passwordsMatch = await bcrypt.compare(currentPassword, response.rows[0].password);

			if (!passwordsMatch)
				return (res.json("invalid password"));
			else
			{
				const salt = await bcrypt.genSalt(10);
				const newPasswordEncrypted = await bcrypt.hash(newPassword, salt);
		
				sql = "UPDATE users SET password = $1 WHERE id = $2";
				await pool.query(sql, [newPasswordEncrypted, req.id])
					
				res.json("password changed");
			}
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private beep user
router.put('/beep/:username', auth,
	async (req, res) =>
	{
		try
		{
			const { username } = req.params;

			const sql = "UPDATE users SET fame = fame + 1 WHERE username = $1";
			await pool.query(sql, [username])
			
			res.json(username + " beeped");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// private unbeep user
router.put('/unbeep/:username', auth,
	async (req, res) =>
	{
		try
		{
			const { username } = req.params;

			const sql = "UPDATE users SET fame = fame - 1 WHERE username = $1";
			await pool.query(sql, [username])
			
			res.json(username + " unbeeped");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

module.exports = router;