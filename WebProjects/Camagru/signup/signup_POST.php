<?php
	if (isset($_POST['submit']))
	{
		$username = $_POST['username'];
		$email = $_POST['email'];
		$password1 = $_POST['password1'];
		$password2 = $_POST['password2'];

		$pdo = connect_db();

		// validate username
		if (empty($username))
			$username_error = 'Username missing';
		else if (strlen($username) < 3)
			$username_error = 'Username must be at least 3 characters';
		else if (strlen($username) > 20)
			$username_error = 'Username cannot be longer than 20 characters';
		else if (!ctype_alnum($username))
			$username_error = 'Username can only contain letters and numbers';
		else
		{
			$sql = "SELECT `username` FROM users WHERE `username`='$username'";
			$sth = $pdo->prepare($sql);
			$sth->execute();
			if (!empty($sth->fetch(PDO::FETCH_ASSOC)))
				$username_error = 'Username already used by another account';
		}

		// validate email
		if (empty($email))
			$email_error = 'Email missing';
		else if (strlen($email) > 40)
			$email_error = 'Email cannot be longer than 40 characters';
		else
		{
			$sql = "SELECT `email` FROM users WHERE `email`='$email'";
			$sth = $pdo->prepare($sql);
			$sth->execute();
			if (!empty($sth->fetch(PDO::FETCH_ASSOC)))
				$email_error = 'Email already used by another account';
		}

		// validate password
		if (empty($password1))
			$password_error = 'Password missing';
		else if (empty($password2))
			$password_error = 'Password confirmation missing';
		else if (($password1 != $password2))
			$password_error = 'Passwords do not match';
		else if (strlen($password1) < 3)
			$password_error = 'Password must be at least 3 characters long';
		else if (no_uppercase_letters($password1))
			$password_error = 'Password must have at least one uppercase letter';
		else if (no_lowercase_letters($password1))
			$password_error = 'Password must have at least one lowercase letter';

		// if no errors, add user to database
		if (!isset($username_error) && !isset($email_error) && !isset($password_error))
		{
			$activation_code = md5(rand());

			$to = $email;
			$subject = "Verify Email";
			$message = "Please activate your 10GAG account with this code:".$activation_code;
			mail($to, $subject, $message);

			$password = password_hash($password1, PASSWORD_DEFAULT);
			$sql = "INSERT INTO users (`username`, `email`, `password`, activation_code) VALUES ('$username','$email','$password','$activation_code')";
			$sth= $pdo->prepare($sql);
			$sth->execute();

			header('location: signup_success.php');
			exit;
		}
	}
?>