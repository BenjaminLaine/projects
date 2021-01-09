<?php
	session_start();

	if (!isset($_SESSION['username']))
	{
		header("location: index.php", true, 301);
		exit;
	}

	// Unset session variables (local)
	session_unset();

	// destroy all data registered to the session
	session_destroy();
	
	header("location: index.php");
	exit;
?>