<?php
	session_start();

	$title = "Reset password";

	require_once('functions.php');

	if (isset($_POST['submit']))
	{
		$email = $_POST['email'];
		$pdo = connect_db();

		$stmt = $pdo->prepare('SELECT * FROM users WHERE `email` = ?');
		$stmt->execute([$email]);
		$user = $stmt->fetch(PDO::FETCH_ASSOC);

		if (!empty($user))
		{
			$password1 = uniqid();
			$password = password_hash($password1, PASSWORD_DEFAULT);
			$email = $user['email'];
			$username = $user['username'];
			$sql = "UPDATE users SET `password`=? WHERE `username`=?";
			$pdo->prepare($sql)->execute([$password , $username]);
			$msg = "Hello!\nHere is your new password: ". $password1;
			mail($email, "New Password", $msg);
		}
		$email_sent = 1;
	}
?>

<?php require_once('templates/header.php'); ?>

		<div class="row no-gutters">
			<div class="col-sm-6 border">
			<!-- left column start -->
				<div id="inner2">
					<?php require_once('templates/logo.php'); ?>
					<h3>Reset password</h3>
					<p>Enter your email to receive a new temporary password.</p>
					<form action="reset_password.php" method="POST">
						<div class="form-group">
							<label>Email</label>
							<input type="email" name="email" class="form-control" value="">
						</div>

						<?php
						if (isset($email_sent))
							echo "<p class=\"alert alert-success\">New password sent</p>";
						?>

						<div class="form-group">
							<input type="submit" name="submit" class="btn btn-primary" value="Reset Password">
						</div>
					</form>
				</div>
				</div>
			<!-- left column end -->
			</div>
		</div>

<?php require_once('templates/footer.php'); ?>