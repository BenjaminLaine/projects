<?php
	if (isset($_POST['webcam']))
	{
			$img = $_POST['webcam'];
			$img = str_replace('data:image/png;base64,', '', $img);
			$img = str_replace(' ', '+', $img);
			$img_data = base64_decode($img);
			$img_name = uniqid() . '.png';
			
			file_put_contents('img/tmp/' . $img_name, $img_data);
			copy('img/tmp/' . $img_name, 'img/tmp/bak_' . $img_name);

			$stmt = $pdo->prepare("INSERT INTO img_tmp (`name`, `owner_id`) VALUES (?, ?)");
			$stmt->execute([$img_name, $user_id]);

			$success = "Webcam snapshop successfull";
			$_SESSION["image"] = $img_name;
	}
	else if (isset($_POST["upload"]) && !empty($_FILES["image"]["name"]))
	{
		$type = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
		
		if ($_FILES["image"]["size"] == 0)
		$error = "No image selected";
		else if ($_FILES["image"]["size"] > 1000000)
		$error = "Image is too large. Maximum size is 1 MB.";
		else if ($type != "jpg" && $type != "jpeg" && $type != "png")
		$error = "Wrong file type. Only jpg, jpeg and png allowed.";
		else
		{
			$img_name = uniqid() . "." . $type;
			move_uploaded_file($_FILES["image"]["tmp_name"], "img/tmp/" . $img_name);
			copy('img/tmp/' . $img_name, 'img/tmp/bak_' . $img_name);

			$stmt = $pdo->prepare("INSERT INTO img_tmp (`name`, `owner_id`) VALUES (?, ?)");
			$stmt->execute([$img_name, $user_id]);

			$success = "Image uploaded";
			$_SESSION["image"] = $img_name;
		}
	}
	else if (isset($_POST["save"]))
	{
		move_to_gallery($img_name, $pdo);

		$_SESSION['image'] = "";
		unset($_SESSION['image']);
		
		header("Location: edit.php", true, 301);
		exit;
	}
	else if (isset($_POST["clear_canvas"]))
	{
		delete_tmp($img_name, $pdo);

		$_SESSION['image'] = "";
		unset($_SESSION['image']);

		header("Location: edit.php", true, 301);
		exit;
	}
	else if (isset($_POST['add_elements_button']))
	{
		require_once('edit/edit_SI.php');
	}
	else if (isset($_POST['clear_elements_button']))
	{
		copy('img/tmp/bak_' . $img_name, 'img/tmp/' . $img_name);
		header("Location: edit.php", true, 301);
	}
?>