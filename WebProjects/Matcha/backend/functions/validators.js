module.exports = {
	register: (userData) =>
	{
		const patternUsername = /^[A-Za-z]+$/;
		if (!patternUsername.test(userData.username) || userData.username.length < 3 || userData.username.length > 40)
			return false;

		const patternEmail = /\S+@\S+\.\S+/;
		if (!patternEmail.test(userData.email) || userData.email.length < 5 || userData.email.length > 40)
			return false;

		const age = Number(userData.age);
		if (age < 18 || age > 100)
			return false;

		const gender = Number(userData.gender);
		if (gender < 1 || gender > 3)
			return false;

		const sexuality = Number(userData.sexuality);
		if (sexuality < 1 || sexuality > 3)
			return false;

		if (userData.password.length < 8 || userData.password.length > 41)
			return false;

		return true;
	},
	login: (username, password) =>
	{
		const patternUsername = /^[A-Za-z]+$/;
		if (!patternUsername.test(username) || username.length < 3 || username.length > 40)
			return false;
		if (password.length < 8 || password.length > 41)
			return false;
		return true;
	},
	newPassword: (password) =>
	{
		if (password.length < 8 || password.length > 41)
			return false;
		return true;
	},
	sendMessage: (recipient, message) =>
	{
		if (Number(recipient) < 0 || Number(recipient) > 2147483647)
			return false;
		if (message.length < 1 || message.length > 300)
			return false;
		return true;
	}
};
