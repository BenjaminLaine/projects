<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<!-- ensures proper rendering and touch zooming for all devices -->
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title><?php echo isset($title) ? $title : ucfirst(basename($_SERVER['PHP_SELF'], '.php')) ?></title>
	<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"> 
	<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/<?php
		if (!isset($_COOKIE['10GAG_theme']))
		{
			setcookie('10GAG_theme', 'light.css', time() + (86400 * 365), "/");
			header("Refresh:0");
			exit;
		}
		echo $_COOKIE['10GAG_theme']
		?>">
	
</head>
<body>
	<div id="header" class="container">
		<div class="row no-gutters">
			<div class="col-sm border" style="padding:0">
					<nav class="navbar navbar-expand-sm navbar-light bg-light">
					<a href="index.php" title="Home"><img src="img/site/10gag.png" class="logo-small" alt="10GAG"></a>
					<div id="navbarSupportedContent">
						<ul class="navbar-nav mr-auto">
							<li class="nav-item">
								<a class="nav-link" href="gallery.php"><i class="fas fa-images fa-fw fa-2x" title="Gallery"></i></a>
							</li>
							<?php
								// show these links only when user is logged in
								if (isset($_SESSION['username']))
								{
									echo "<li class=\"nav-item\">";
									echo "<a class=\"nav-link\" href=\"edit.php\"><i class=\"fas fa-camera-retro fa-fw fa-2x\" title=\"Upload\"></i></a>";
									echo "</li>";
									echo "<li class=\"nav-item\">";
									echo "<a class=\"nav-link\" href=\"settings.php\"><i class=\"fas fa-cog fa-fw fa-2x\" title=\"Settings\"></i></a>";
									echo "</li>";
									echo "<li class=\"nav-item\">";
									echo "<a class=\"nav-link\" href=\"logout.php\"><i class=\"fas fa-sign-out-alt fa-fw fa-2x\" title=\"Log Out\"></i>".htmlspecialchars($_SESSION['username'])."</a>";
									echo "</li>";
								}
								else
								{
									echo "<li class=\"nav-item\">";
									echo "<a class=\"nav-link\" href=\"login.php\"><i class=\"fas fa-key fa-fw fa-2x\" title=\"Log In\"></i>Log In</a>";
									echo "</li>";
									echo "<li class=\"nav-item\">";
									echo "<a class=\"nav-link\" href=\"signup.php\"><i class=\"fas fa-edit fa-fw fa-2x\" title=\"Sign Up\"></i>Sign Up</a>";
									echo "</li>";
								}
							?>
						</ul>
					</div>
				</nav>
			</div>
		</div>