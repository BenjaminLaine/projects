<?php

require_once('database.php');

try
{
	$host = 'mysql:host=localhost';

	$pdo = new PDO($host, $DB_USER, $DB_PASSWORD);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$sql = "CREATE DATABASE IF NOT EXISTS camagru";
	$pdo->exec($sql);

	$pdo = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = "CREATE TABLE IF NOT EXISTS users (
		`id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
		`username` VARCHAR(50) UNIQUE NOT NULL,
		`firstname` VARCHAR(50),
		`lastname` VARCHAR(50),
		`email` VARCHAR(255) UNIQUE NOT NULL,
		`password` VARCHAR(255) NOT NULL,
		`profile_img` VARCHAR(50) DEFAULT 'default.jpg',
		`notifications` TINYINT(1) DEFAULT 1,
		`activated` TINYINT(1) DEFAULT 0,
		`activation_code` VARCHAR(50) NOT NULL,
		`admin` TINYINT(1) DEFAULT 0,
		`created` DATETIME DEFAULT CURRENT_TIMESTAMP
	)";
	$pdo->exec($sql);

	$sql = "INSERT INTO users (`username`, `email`, `password`, `activated`, `activation_code`)
		VALUES	('taho', 'taho@gmail.com', '$2y$10$52EMc8j3UGCZDboWSAt.zOjhufuKrSywHuoFnvwOk00O7SlCkaLda', '1', 'dgdagsfagsfgsfhbbsfgsgh'),
				('blaine', 'blaine@gmail.com', '$2y$10$52EMc8j3UGCZDboWSAt.zOjhufuKrSywHuoFnvwOk00O7SlCkaLda', '1', 'dgdagsfagsfgsfhbbsfgsgh');";
	$pdo->exec($sql);

	$sql = "CREATE TABLE img_profile (
		`id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
		`name` VARCHAR(50) UNIQUE NOT NULL,
		`owner_id` INT UNSIGNED NOT NULL,
		`created` DATETIME DEFAULT CURRENT_TIMESTAMP)";
	$pdo->exec($sql);

	$sql = "CREATE TABLE img_tmp (
		`id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
		`name` VARCHAR(50) UNIQUE NOT NULL,
		`owner_id` INT UNSIGNED NOT NULL,
		`created` DATETIME DEFAULT CURRENT_TIMESTAMP)";
	$pdo->exec($sql);

	$sql = "CREATE TABLE img_gallery (
		`id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
		`name` VARCHAR(50) UNIQUE NOT NULL,
		`owner_id` INT UNSIGNED NOT NULL,
		`likes` INT UNSIGNED NOT NULL DEFAULT 0,
		`created` DATETIME DEFAULT CURRENT_TIMESTAMP)";
	$pdo->exec($sql);

	$sql = "CREATE TABLE comments (
		`id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
		`user_id` INT UNSIGNED NOT NULL,
		`username` VARCHAR(50) NOT NULL,
		`img_id` INT UNSIGNED NOT NULL,
		`comment` VARCHAR(255) NOT NULL,
		`created` DATETIME DEFAULT CURRENT_TIMESTAMP)";
	$pdo->exec($sql);

	$sql = "CREATE TABLE likes (
		`id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
		`user_id` INT UNSIGNED NOT NULL,
		`img_id` INT UNSIGNED NOT NULL,
		`created` DATETIME DEFAULT CURRENT_TIMESTAMP)";
	$pdo->exec($sql);

	header("Location: login.php", true, 301);
	exit();
}
catch(PDOException $e)
{
	echo $sql . "<br>" . $e->getMessage();
}

$pdo = NULL;

?>
