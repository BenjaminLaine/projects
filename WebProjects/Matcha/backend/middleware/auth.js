const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) =>
{
	// Get token from header
	let token = req.header("Authorization");

	// Check if not token
	if (!token)
		return res.status(401).json({ msg: "No token, authorization denied" });

	// remove everything but the token itself
	token = token.replace("Bearer ", "");

	// Verify token
	try
	{
		const decoded = jwt.verify(token, config.get("jwtSecret"));

		req.id = decoded.id;

		next();
	}
	catch (err)
	{
		res.status(401).json({ msg: "Token is not valid" });
	}
};