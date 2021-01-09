const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const validators = require('./functions/validators');

// connect to database
const pool = require("./config/db");

// enable access to files in public folder
app.use(express.static('public'));

// helmet
app.use(helmet());

// handles cross domain requests
app.use(cors());

// fixes image uploading size limit error
app.use(express.json({ limit: '2mb' }));

// emitter
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

// MIDDLEWARE
const auth = require('./middleware/auth');

// Define Routes
app.use('/api/account', require('./routes/accountRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/tags', require('./routes/tagRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/beeps', require('./routes/beepRoutes'));
app.use('/api/blocks', require('./routes/blockRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

// SSE ************************************************************

app.get("/api/stream/:id", (req,res) => {

	const { id } = req.params;

	// remove all previous emitters with the same id
	emitter.removeAllListeners(id);

	// 10 minute server timeout (closes current connection and tries to create a new one)
	res.connection.setTimeout(600000);

	// create a new connection
	const headers = {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive',
		'Cache-Control': 'no-cache',
		'Transfer-Encoding': 'compress'
	};
	res.writeHead(200, headers);

	// set user to "online"
	sql = "UPDATE users SET online = true WHERE id = $1";
	pool.query(sql, [id]);

	// console.log("\033[35mid:" + id + "\033[39m" + " connected to stream")

	// when client or server timeout closes connection
	req.on('close', () =>
	{
		try
		{
			// close connection
			res.end();

			// remove listeners with the same id
			emitter.removeAllListeners(id);

			let sql = "UPDATE users SET online = false, last_seen = now() WHERE id = $1";
			pool.query(sql, [id]);

			// console.log("\033[35mid:" + id + "\033[39m" + " closed connection");
		}
		catch (err)
		{
			console.error(err.message);
		}
	});

	emitter.on(id, async function()
	{
		try
		{
			sql = "SELECT COUNT(*) FROM notifications WHERE recipient = $1 AND new = true";
			const notifications = await pool.query(sql, [id]);
		
			sql = "SELECT COUNT(*) FROM messages WHERE recipient = $1 AND new = true";
			const messages = await pool.query(sql, [id]);
		
			res.write("data: " + notifications.rows[0].count + "," + messages.rows[0].count + "\n\n");
			
			// console.log("\033[35mid:" + id + "\033[39m" + " received new data");
		}
		catch (err)
		{
			console.error(err.message);
		}
	});
	emitter.emit(id);
})

// ****************************************************************

// Send Message
app.post('/api/messages/send/', auth,
	async (req, res) =>
	{
		const { recipient, msg } = req.body;

		if (!validators.sendMessage(recipient, msg))
			return (res.json({ message: "invalid data" }));

		try
		{
			// send a message
			await pool.query("INSERT INTO messages (sender, recipient, msg) VALUES ($1, $2, $3)", [req.id, recipient, msg]);

			emitter.emit(recipient);

			res.json("message sent");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

// send a new notification
app.post('/api/notifications/create', auth,
	async (req, res) =>
	{
		try
		{
			const { type, sender, recipient } = req.body;

			// send a notification
			const sql = "INSERT INTO notifications (type, sender, recipient) VALUES ($1, $2, $3)";
			await pool.query(sql, [type, sender, recipient]);

			emitter.emit(recipient);
	
			res.json("notification sent");
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
);

app.listen(5000, () => { console.log("server has started on port 5000"); });