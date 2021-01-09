<?php
	session_start();

	// if not logged in, redirect to login.php
	if (!isset($_SESSION['username']))
	{
		header("location: login.php", true, 301);
		exit;
	}

	require_once('functions.php');
	$pdo = connect_db();

	$username = $_SESSION['username'];
	$firstname = $_SESSION['firstname'];
	$lastname = $_SESSION['lastname'];

	$stmt = $pdo->prepare('SELECT `email` FROM users WHERE `username` = ?');
	$stmt->execute([$username]);
	$email = $stmt->fetch(PDO::FETCH_COLUMN);

	require_once('settings/settings_POST.php');
?>

<?php require_once('templates/header.php'); ?>
	<script>
		function reload()
		{
			if (document.cookie.search("10GAG_theme=dark.css") > -1)
				document.cookie = "10GAG_theme=light.css";
			else
				document.cookie = "10GAG_theme=dark.css";
			location.reload();
			return false;
		}
	</script>
	<?php require_once('settings/settings_forms.php');?>

<?php require_once('templates/footer.php'); ?>