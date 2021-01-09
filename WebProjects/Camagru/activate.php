<?php
	session_start();
	require_once('functions.php');
	$pdo = connect_db();

	// if not logged in, redirect to login.php
	if (!isset($_SESSION['username']))
	{
		header("Location: login.php", true, 301);
		exit;
	}

	// if not activated in, redirect to not_activated.php
	if ($_SESSION['activated'])
	{
		header("Location: edit.php", true, 301);
		exit;
	}

	$user_id = $_SESSION['id'];
	$stmt = $pdo->prepare("SELECT `email`, `activation_code` FROM users WHERE `id` = ?");
	$stmt->execute([$user_id]);
	$user = $stmt->fetch(PDO::FETCH_ASSOC);
	$code_in_db = $user['activation_code'];
	$email = $user['email'];
	$msg = "Here is your activation code:".$code_in_db."\nHave fun!";
	
	if (isset($_POST['submit']))
	{
		$code_in_get = $_POST['activation_code'];
		if ($code_in_get == $code_in_db)
		{
			$_SESSION['activated'] = 1;
			
			$stmt = $pdo->prepare("UPDATE users SET `activated` = 1 WHERE id = ?");
			$stmt->execute([$user_id]);
			header("Location: edit.php", true, 301);
			exit;
		}
	}

	if (isset($_POST['resend']))
	{
		mail($email, "Activation code", $msg);
	}

?>

<?php require_once('templates/header.php'); ?>

<div class="row no-gutters">
			<div class="col-sm-6 border">
				<div id="inner2">
					<form action="activate.php" method="POST">
						<div class="form-group">
							<p></p>
							<label>Enter activation code</label>
							<input type="text" name="activation_code" class="form-control" value="">
						</div>
						<div class="form-group">
							<input type="submit" name="submit" class="btn btn-primary" value="Submit">
						</div>
					</form>
					<form action="activate.php" method="POST">
					<div class="form-group">
							<input type="submit" name="resend" class="btn btn-primary" value="Resend Code">
						</div>
					</form>
		</div>
<?php require_once('templates/footer.php'); ?>