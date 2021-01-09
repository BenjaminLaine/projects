<?php
if (isset($_POST['change_password']))
	{
		$password1 = $_POST['password1'];
		$new_password1 = $_POST['new_password1'];
		$new_password2 = $_POST['new_password2'];
		$sql = $pdo->prepare("SELECT `password` FROM users WHERE username=?");
		$sql->execute([$username]);
		$password2 = $sql->fetch(PDO::FETCH_COLUMN);

		if (empty($password1))
			$old_password_error = 'Password missing';
		else if (!password_verify($password1, $password2))
			$old_password_error = 'Wrong password';

		if (empty($new_password1))
			$new_password_error = 'Password missing';
		else if (empty($new_password2))
			$new_password_error = 'Password confirmation missing';
		else if (($new_password1 != $new_password2))
			$new_password_error = 'Passwords do not match';

		if (!isset($old_password_error) && !isset($new_password_error))
		{
			$password = password_hash($new_password1, PASSWORD_DEFAULT);
			$sql = "UPDATE users SET `password`=? WHERE `username`=?";
			$pdo->prepare($sql)->execute([$password , $username]);
			$change_password_success = 1;
		}
	}
	else if (isset($_POST['change_other']))
	{
		$new_username = $_POST['username'];
		$new_firstname = $_POST['firstname'];
		$new_lastname = $_POST['lastname'];
		$new_email = $_POST['email'];
		$password1 = $_POST['password1'];
		$sql = $pdo->prepare("SELECT `password` FROM users WHERE username=?");
		$sql->execute([$username]);
		$password2 = $sql->fetch(PDO::FETCH_COLUMN);

		if ($new_username != $username)
		{
			if (strlen($new_username) < 3)
				$username_error = 'Username must be at least 8 characters';
			else if (strlen($new_username) > 20)
				$username_error = 'Username cannot be longer than 20 characters';
			else if (!ctype_alnum($new_username))
				$username_error = 'Username can only contain letters and numbers';
			else
			{
				$stmt = $pdo->prepare('SELECT `username` FROM users WHERE `username` = ?');
				$stmt->execute([$new_username]);
				$user = $stmt->fetch(PDO::FETCH_COLUMN);
				if (!empty($user))
					$username_error = 'Username already in use';
			}
		}
		if ($new_firstname != $firstname)
		{
			if (strlen($new_firstname) < 2)
				$firstname_error = 'First Name must be at least 2 characters';
			else if (strlen($new_firstname) > 20)
				$firstname_error = 'First Name cannot be longer than 20 characters';
			else if (!ctype_alpha($new_firstname))
				$firstname_error = 'First Name can only contain letters';
		}
		if ($new_lastname != $lastname)
		{
			if (strlen($new_lastname) < 2)
				$lastname_error = 'Last Name must be at least 2 characters';
			else if (strlen($new_lastname) > 20)
				$lastname_error = 'Last Name cannot be longer than 20 characters';
			else if (!ctype_alpha($new_lastname))
				$lastname_error = 'Last Name can only contain letters';
		}
		if ($new_email != $email)
		{
			if (strlen($new_email) > 40)
				$email_error = 'Email cannot be longer than 40 characters';
			else
			{
				$stmt = $pdo->prepare('SELECT `email` FROM users WHERE `email` = ?');
				$stmt->execute([$new_email]);
				$user = $stmt->fetch(PDO::FETCH_ASSOC);
				if (!empty($user))
					$email_error = 'Email already in use';
			}
		}
		if (empty($password1))
			$password_error = 'Password missing';
		else if (!password_verify($password1, $password2))
			$password_error = 'Password Wrong';

		if (!isset($username_error) && !isset($firstname_error) && !isset($lastname_error) && !isset($email_error) && !isset($password_error))
		{
			if ($new_username != $username)
			{
				$sql = "UPDATE users SET `username`=? WHERE `username`=?";
				$pdo->prepare($sql)->execute([$new_username , $username]);
				$_SESSION['username'] = $new_username;
				$username = $new_username;
				$change_other_success = 1;
			}
			if ($new_firstname != $firstname)
			{
				$sql = "UPDATE users SET `firstname`=? WHERE `username`=?";
				$pdo->prepare($sql)->execute([$new_firstname , $username]);
				$_SESSION['firstname'] = $new_firstname;
				$firstname = $new_firstname;
				$change_other_success = 1;
			}
			if ($new_lastname != $lastname)
			{
				$sql = "UPDATE users SET `lastname`=? WHERE `username`=?";
				$pdo->prepare($sql)->execute([$new_lastname , $username]);
				$_SESSION['lastname'] = $new_lastname;
				$lastname = $new_lastname;
				$change_other_success = 1;
			}
			if ($new_email != $email)
			{
				$sql = $pdo->prepare("SELECT `activation_code` FROM users WHERE `username`=?");
				$sql->execute([$username]);
				$activation_code = $sql->fetch(PDO::FETCH_COLUMN);
				$sql = "UPDATE users SET `email`=?, `activated`=? WHERE `username`=?";
				$pdo->prepare($sql)->execute([$new_email, 0, $username]);
				$msg = "Here is your activation code:".$activation_code."\nHave fun!";
				mail($new_email, "Vertify new email", $msg);
				$_SESSION['activated'] = 0;
				$email = $new_email;
				$change_other_success = 1;
			}
			if (isset($_POST['notifications']) && $_POST['notifications'] == "on")
				$notifications = 1;
			else
				$notifications = 0;
			if ($_SESSION['notifications'] != $notifications);
				$change_other_success = 1;
			$_SESSION['notifications'] = $notifications;
			$sql = "UPDATE users SET `notifications` = ? WHERE `username` = ?";
			$pdo->prepare($sql)->execute([$notifications , $username]);
		}
	}
?>