<?php

function connect_db()
{
	// check path!
	require_once('database.php');

	try
	{
		$pdo = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch(PDOException $e)
	{
		echo $sql . "<br>" . $e->getMessage();
		$pdo = NULL;
	}
	return ($pdo);
}

function no_uppercase_letters($str)
{
	for ($i = 0; $str[$i]; $i++)
		if (($str[$i] >= 'A' && $str[$i] <= 'Z'))
			return (0);
	return (1);
}

function no_lowercase_letters($str)
{
	for ($i = 0; $str[$i]; $i++)
		if (($str[$i] >= 'a' && $str[$i] <= 'z'))
			return (0);
	return (1);
}

function no_special_characters($str)
{
	for ($i = 0; $str[$i]; $i++)
		if (($str[$i] >= ' ' && $str[$i] <= '/') ||
			($str[$i] >= ':' && $str[$i] <= '@') ||
			($str[$i] >= '[' && $str[$i] <= '`') ||
			($str[$i] >= '{' && $str[$i] <= '~'))
			return (0);
	return (1);
}

function delete_tmp($img_name, $pdo)
{
	// delete files from server
	unlink("img/tmp/" . $img_name);
	unlink("img/tmp/bak_" . $img_name);

	// delete files from database
	$stmt = $pdo->prepare("DELETE FROM img_tmp WHERE `name` = ?");
	$stmt->execute([$img_name]);
}

function move_to_gallery($img_name, $pdo)
{
	// copy tmp to gallery
	$src = "img/tmp/" . $img_name;
	$dst = "img/gallery/" . $img_name;
	copy($src, $dst);

	// get owner_id of image
	$stmt = $pdo->query("SELECT `owner_id` FROM img_tmp");
	$owner_id = $stmt->fetchColumn();

	// delete tmp from server and database
	delete_tmp($img_name, $pdo);

	// insert image data into database
	$stmt = $pdo->prepare("INSERT INTO img_gallery (`name`, `owner_id`) VALUES (?, ?)");
	$stmt->execute([$img_name, $owner_id]);
	$_SESSION["image"] = "";
}

?>