const pool = require("./config/db");

(async (req, res) =>
{
	try
	{
		console.log("Installing BeeTogether");

		await pool.query("CREATE TABLE users (\
			id SERIAL PRIMARY KEY,username VARCHAR(50) NOT NULL UNIQUE,\
			email VARCHAR(50) NOT NULL UNIQUE,\
			password VARCHAR(255) NOT NULL,\
			location VARCHAR(100) DEFAULT '',\
			profile_image VARCHAR(100) DEFAULT 'http://localhost:5000/default.jpg',\
			latitude REAL DEFAULT 60.16952,\
			longitude REAL DEFAULT 24.93545,\
			first_name VARCHAR(50) DEFAULT '',\
			last_name VARCHAR(50) DEFAULT '',\
			age SMALLINT,\
			gender SMALLINT,\
			sexuality SMALLINT,\
			bio VARCHAR(300) DEFAULT '',\
			fame SMALLINT DEFAULT 0,\
			activation VARCHAR(100),\
			online BOOLEAN NOT NULL DEFAULT FALSE,\
			last_seen TIMESTAMP DEFAULT now(),\
			admin BOOLEAN NOT NULL DEFAULT FALSE,\
			created TIMESTAMP DEFAULT now())");
		console.log("users created");

		await pool.query("INSERT INTO users (username, email, password, location, age, gender, sexuality, admin)\
			VALUES ('admin', 'admin@gmail.com', '$2a$10$8iGoLZtQFYqrvvctww/goe8gGChu0tsaiaxWATkO2AsFzvkwjh0ye', 'Helsinki', 18, 1, 1, true)");

		await pool.query("CREATE TABLE images (\
			id SERIAL PRIMARY KEY,\
			name VARCHAR(100) NOT NULL UNIQUE,\
			owner INTEGER NOT NULL,\
			created TIMESTAMP DEFAULT now());");
		console.log("images created");

		await pool.query("CREATE TABLE messages (\
			id SERIAL PRIMARY KEY,\
			sender INTEGER NOT NULL,\
			recipient INTEGER NOT NULL,\
			msg VARCHAR(500) NOT NULL,\
			new BOOLEAN NOT NULL DEFAULT TRUE,\
			created TIMESTAMP DEFAULT now());");
		console.log("messages created");

		await pool.query("CREATE TABLE tags (\
			id SERIAL PRIMARY KEY,\
			owner INTEGER NOT NULL,\
			name VARCHAR(50) NOT NULL,\
			created TIMESTAMP DEFAULT now());");
		console.log("tags created");

		await pool.query("CREATE TABLE beeps (\
			id SERIAL PRIMARY KEY,\
			sender INTEGER NOT NULL,\
			recipient INTEGER NOT NULL,\
			created TIMESTAMP DEFAULT now());");
		console.log("beeps created");

		await pool.query("INSERT INTO tags (owner, name)\
			VALUES (1, 'love')");

		await pool.query("CREATE TABLE blocks (\
			id SERIAL PRIMARY KEY,\
			sender INTEGER NOT NULL,\
			recipient INTEGER NOT NULL,\
			created TIMESTAMP DEFAULT now());");
		console.log("blocks created");

		await pool.query("CREATE TABLE reports (\
			id SERIAL PRIMARY KEY,\
			sender INTEGER NOT NULL,\
			recipient INTEGER NOT NULL,\
			new BOOLEAN NOT NULL DEFAULT TRUE,\
			created TIMESTAMP DEFAULT now());");
		console.log("reports created");

		await pool.query("CREATE TABLE notifications (\
			id SERIAL PRIMARY KEY,\
			type SMALLINT NOT NULL,\
			sender INTEGER NOT NULL,\
			recipient INTEGER NOT NULL,\
			new BOOLEAN NOT NULL DEFAULT TRUE,\
			created TIMESTAMP DEFAULT now());");
		console.log("notifications created");

		console.log("BeeTogether installed");
	}
	catch (err)
	{
		console.error(err.message);
	}
})()