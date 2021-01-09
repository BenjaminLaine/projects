<?php
	session_start();

	if (isset($_SESSION['username']))
	{
		header("location: index.php", true, 301);
		exit;
	}

	require_once('functions.php');

	$title = 'New Account Created';
?>
<?php require_once('templates/header.php'); ?>

		<div id="outer">
			<div id="inner">
				<?php require_once('templates/logo.php'); ?>
				<p class="center">New account successfully created!</p>
				<p class="center">You can now <a href="login.php">Login</a></p>	
			</div>
		</div>

<?php require_once('templates/footer.php'); ?>