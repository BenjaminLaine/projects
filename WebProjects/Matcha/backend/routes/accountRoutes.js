const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const pool = require("../config/db");
const nodemailer = require("nodemailer");
const validators = require('../functions/validators');

// public register user
router.post('/register',
	async (req, res) =>
	{
		const { username, email, age, gender, sexuality, password } = req.body;

		if (!validators.register({ username, email, age, gender, sexuality, password }))
			return (res.json({ message: "invalid data" }));
		
		try
		{
			// check for duplicate username
			let sql = "SELECT 1 FROM users WHERE username = $1";
			const found_username = await pool.query(sql, [username]);
			if (found_username.rowCount)
				return res.json({ message: "username already exists" });

			// check for duplicate email
			sql = "SELECT 1 FROM users WHERE email = $1";
			const found_email = await pool.query(sql, [email]);
			if (found_email.rowCount)
				return res.json({ message: "email used by another account" });

			// encrypt password
			const salt = await bcrypt.genSalt(10);
			const passwordEncrypted = await bcrypt.hash(password, salt);

			// create random activation code
			const activationCode = uuidv4();

			// add user to database
			sql = "INSERT INTO users (username, email, age, gender, sexuality, password, activation) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
			const user = await pool.query(sql, [username, email, age, gender, sexuality, passwordEncrypted, activationCode]);

			// add default tag
			sql = "INSERT INTO tags (owner, name) VALUES ($1, $2)";
			await pool.query(sql, [user.rows[0].id, "love"]);

			// create email transporter for activation link
			const transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 465,
				secure: true, // use SSL
				auth: {
					user: "beetogether42@gmail.com",
					pass: "$segfault123456"
				}
			});

			// create activation url
			const url = "http://localhost:3000/activation/" + activationCode;

			// send activation link
			await transporter.sendMail({
				from: '"BeeTogetherMailBot" <beetogether42@gmail.com>',
				to: email,
				subject: "Please activate your BeeTogether account",
				text: "Please visit the following url to activate your BeeTogether account: " + url,
				html: "<h2>Account Activation</h2><p>Please click the link below to activate your BeeTogether account.</p><a href=\"" + url + "\">" + url + "</a>",
			});

			res.json("activation code sent");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// public activate account
router.get('/activate/:key',
	async (req, res) =>
	{
		try
		{
			const { key } = req.params;

			// remove activation key from the database
			const sql = "UPDATE users SET activation = null WHERE activation = $1";
			await pool.query(sql, [key])
			
			res.json("account activated");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// public login user & get token
router.post('/login',
	async (req, res) =>
	{
		const { username, password } = req.body;

		if (!validators.login(username, password))
			return (res.json({ message: "invalid data" }));

		try
		{
			// fetch data of given username
			let sql = "SELECT id, password, location, activation FROM users WHERE username = $1";
			const user = await pool.query(sql, [username])

			// error if username was not found
			if (!user.rows[0])
				return (res.json({ message: "invalid username / password combination" }));

			// error if account not activated
			if (user.rows[0].activation !== null)
				return (res.json({ message: "account not activated" }));

			// confirm that given password matches the one in the database 
			const passwordsMatch = await bcrypt.compare(password, user.rows[0].password);
			if (!passwordsMatch)
				return (res.json({ message: "invalid username / password combination" }));

			// generate JSON web token payload using user id
			const payload = {
				id: user.rows[0].id
			};

			// generate and return JSON web token
			jwt.sign(payload, config.get('jwtSecret'),
				(err, token) =>
				{
					if (err)
						throw err;
					res.json({ token: token, message: "login success" });
				}
			);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// public forgot password
router.post('/forgotpassword',
	async (req, res) =>
	{
		const { email } = req.body;

		// fetch the user id of given email
		const sql = "SELECT id FROM users WHERE email = $1";
		const user = await pool.query(sql, [email])

		if (user.rowCount)
		{
			try
			{
				// generate JSON web token payload using user id
				const payload = user.rows[0];

				// generate JSON web token
				const newPasswordCode = jwt.sign(payload, config.get('jwtSecret'));

				// generate url that can be used to assign new password
				const url = "http://localhost:3000/newpassword/" + newPasswordCode;

				// create email transporter
				const transporter = nodemailer.createTransport({
					host: "smtp.gmail.com",
					port: 465,
					secure: true, // use SSL
					auth: {
						user: "beetogether42@gmail.com",
						pass: "$segfault123456"
					}
				});

				// send activation link
				await transporter.sendMail({
					from: '"BeeTogetherMailBot" <beetogether42@gmail.com>',
					to: email,
					subject: "New Password for BeeTogether account",
					text: "Please visit the following url to enter new password: " + url,
					html: "<h2>New Password</h2><p>Please click the link below to assign a new password.</p><a href=\"" + url + "\">" + url + "</a>",
				});

				res.json("email sent");
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
		else
			res.json("account not found");
	}
);

// public set new password
router.post('/newpassword/:token',
	async (req, res) =>
	{
		const { password } = req.body;

		if (!validators.newPassword(password))
			return (res.json({ message: "invalid data" }));

		try
		{
			// take id from token
			const { token } = req.params;
			const decoded = jwt.decode(token);

			// encrypt new password
			const salt = await bcrypt.genSalt(10);
			const passwordEncrypted = await bcrypt.hash(password, salt);

			// update password in database
			const sql = "UPDATE users SET password = $1 WHERE id = $2";
			await pool.query(sql, [passwordEncrypted, decoded.id])
			
			res.json("password changed");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

module.exports = router;