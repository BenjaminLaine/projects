<?php
	session_start();

	if (isset($_SESSION['username']))
	{
		header("location: index.php", true, 301);
		exit;
	}

	require_once('functions.php');

	if (isset($_POST['submit']))
	{
		$username = $_POST['username'];
		$password = $_POST['password'];

		$pdo = connect_db();

		$stmt = $pdo->prepare('SELECT * FROM users WHERE `username` = ?');
		$stmt->execute([$username]);
		$user = $stmt->fetch(PDO::FETCH_ASSOC);

		if (empty($user) || !password_verify($password, $user['password']))
		{
			header('Location: login.php');
			exit;
		}
		else
		{
			$_SESSION['id'] = $user['id'];
			$_SESSION['username'] = $user['username'];
			$_SESSION['firstname'] = $user['firstname'];
			$_SESSION['lastname'] = $user['lastname'];
			$_SESSION['profile_img'] = $user['profile_img'];
			$_SESSION['notifications'] = $user['notifications'];
			$_SESSION['activated'] = $user['activated'];
			$_SESSION['admin'] = $user['admin'];
			header('Location: index.php');
			exit;
		}
	}

	$title = "Log In";
?>

<?php require_once('templates/header.php'); ?>

		<div class="row no-gutters">
			<div class="col-sm-6 border">
			<!-- left column start -->
				<div id="inner2">
					<?php require_once('templates/logo.php'); ?>
					<h3>Log In</h3>
					<form action="login.php" method="POST">
						<div class="form-group">
							<label>Username</label>
							<input type="text" name="username" class="form-control" value="">
						</div>	
						<div class="form-group">
							<label>Password</label>
							<input type="password" name="password" class="form-control" autocomplete="off">
							<span><a href="reset_password.php">Forgot your password?</a></span>
						</div>
						<div class="form-group">
							<input type="submit" name="submit" class="btn btn-primary" value="Login">
						</div>
					</form>
				</div>
				<div id="inner2">
					<div class="box">
						<span>Don't have an account? <a href="signup.php">Sign Up</a></span>
					</div>	
				</div>
			<!-- left column end -->
			</div>
			<div class="col-sm-6 border">
			<!-- right column start-->

			<!-- right column start-->
			</div>
		</div>

<?php require_once('templates/footer.php'); ?>