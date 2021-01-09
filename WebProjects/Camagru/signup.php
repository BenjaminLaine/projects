<?php
	session_start();

	if (isset($_SESSION['username']))
	{
		header("location: index.php", true, 301);
		exit;
	}

	require_once('functions.php');
	require_once('signup/signup_POST.php');
?>
<?php require_once('templates/header.php'); ?>

		<div id="outer">
			<div id="inner">
				<?php require_once('templates/logo.php'); ?>
				<h3>Sign Up</h3>
				<form action="signup.php" method="POST">
					<div class="form-group">
						<label>Username</label>
						<input type="text" name="username" class="form-control" value="">
					</div>
					<?php
						if (isset($username_error))
							echo "<p class=\"alert alert-danger\">" . $username_error . "</p>";
					?>
					<div class="form-group">
						<label>Email</label>
						<input type="email" name="email" class="form-control" value="">
					</div>
					<?php
						if (isset($email_error))
							echo "<p class=\"alert alert-danger\">" . $email_error . "</p>";
					?>
					<div class="form-group">
						<label>Password</label>
						<input type="password" name="password1" class="form-control" value="" autocomplete="off">
					</div>
					<?php
						if (isset($password_error))
							echo "<p class=\"alert alert-danger\">" . $password_error . "</p>";
					?>
					<div class="form-group">
						<label>Confirm Password</label>
						<input type="password" name="password2" class="form-control" value="" autocomplete="off">
					</div>
					<div class="form-group">
						<input type="submit" class="btn btn-warning center" name="submit" value="Sign Up">
					</div>
				</form>
			</div>
			<div id="inner">
				<div class="box">
					<span>Have an account? <a href="login.php">Log In</a></span>
				</div>	
			</div>
		</div>

<?php require_once('templates/footer.php'); ?>