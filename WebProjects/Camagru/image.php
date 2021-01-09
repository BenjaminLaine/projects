<?php
	session_start();

	require_once('functions.php');
	$pdo = connect_db();

	// logged in user info
	if (isset($_SESSION['id']) && isset($_SESSION['username']))
	{
		$user_id = $_SESSION['id'];
		$username = $_SESSION['username'];
	}

	if (isset($_GET['img_id']))
	{
		$img_id = $_GET['img_id'];
		$_SESSION['img_id'] = $img_id;
	}
	else
		$img_id = $_SESSION['img_id'];

	$url = "image.php?img_id=" . $img_id;

	// get current image data from database
	$stmt = $pdo->prepare("SELECT * FROM img_gallery WHERE `id` = ?");
	$stmt->execute([$img_id]);
	$image = $stmt->fetch(PDO::FETCH_ASSOC);

	$img_name = $image['name'];
	$owner_id = $image['owner_id'];
	$likes = $image['likes'];
	$created = $image['created'];

	// get image owner data from database
	$stmt = $pdo->prepare('SELECT `username`, `email`, `profile_img`, `created` FROM users WHERE `id` = ?');
	$stmt->execute([$owner_id]);
	$owner = $stmt->fetch(PDO::FETCH_ASSOC);

	$owner_username = $owner['username'];
	$owner_email = $owner['email'];
	$owner_profile_image = $owner['profile_img'];
	$owner_created = $owner['created'];

	if (isset($_POST['post_comment']) && !empty($_POST['comment']))
	{
		$comment = htmlentities($_POST['comment'], ENT_QUOTES, 'utf-8');
		$stmt= $pdo->prepare("INSERT INTO comments (`user_id`, `username`, `img_id`, `comment`) VALUES (?, ?, ?, ?)");
		$stmt->execute([$user_id, $username, $img_id, $comment]);

		// check if image owner has notifications on
		$stmt = $pdo->prepare("SELECT `notifications` FROM users WHERE `username` = ?");
		$stmt->execute([$owner_username]);
		$notifications = $stmt->fetch(PDO::FETCH_COLUMN);

		// send email
		if ($notifications && $owner_username != $username)
		{
			$to = $owner_email;
			$subject = "Someone commented on your picture!";
			$message = "Someone commented on your picture!\n\nLink to comment:http://127.0.0.1:8080/".$url;
			mail($to, $subject, $message);
		}
	}
	else if (isset($_POST['delete_comment_button']))
	{
		$comment_id = $_POST['delete'];
		$stmt = $pdo->prepare("DELETE FROM comments WHERE `id` = ?");
		$stmt->execute([$comment_id]);

		header("Location: " . $url, true, 301);
		exit;
	}
	else if (isset($_POST['like_button']))
	{
		$stmt = $pdo->prepare("INSERT INTO likes (`user_id`, `img_id`) VALUES (?, ?)");
		$stmt->execute([$user_id, $img_id]);

		$sql = "UPDATE img_gallery SET `likes`= `likes` + 1 WHERE `id`=?";
		$pdo->prepare($sql)->execute([$img_id]);

		header("Location: " . $url, true, 301);
		exit;
	}
	else if (isset($_POST['dislike_image_button']))
	{
		$stmt = $pdo->prepare("DELETE FROM likes WHERE `img_id` = ? AND `user_id` = ?");
		$stmt->execute([$img_id, $user_id]);

		$sql = "UPDATE img_gallery SET `likes`= `likes` - 1 WHERE `id`=?";
		$pdo->prepare($sql)->execute([$img_id]);

		header("Location: " . $url, true, 301);
		exit;
	}
	else if (isset($_POST['delete_image_button']))
	{
		// delete image from server
		unlink("img/gallery/" . $img_name);

		// delete image from database
		$img_id = $_POST['img_id'];
		$stmt = $pdo->prepare("DELETE FROM img_gallery WHERE `id` = ?");
		$stmt->execute([$img_id]);

		// delete comments from database
		$stmt = $pdo->prepare("DELETE FROM comments WHERE `img_id` = ?");
		$stmt->execute([$img_id]);

		// delete likes from database
		$stmt = $pdo->prepare("DELETE FROM likes WHERE `img_id` = ?");
		$stmt->execute([$img_id]);

		// redirect to gallery
		header("Location: gallery.php", true, 301);
		exit;
	}
?>

<?php require_once('templates/header.php'); ?>

		<div class="row no-gutters">
			<div class="col-sm-8 border">
			<!-- center column -->
				<div id="inner2">

					<?php
						if (isset($img_name))
						{
							echo "<p>";
							echo "<img src=\"img/gallery/" . $img_name . "\"</img>";
							echo "</p>";

							// likes start
							if (isset($_SESSION['username']))
							{
								echo "<p>";
								echo "<form action=\"image.php\" method=\"POST\">";
								echo "<div class=\"form-group\">";
								echo "<input type=\"hidden\" name=\"img_id\" value=\"" . $img_id . "\">";
								
	
								$stmt = $pdo->prepare('SELECT count(*) FROM likes WHERE `user_id` = ? AND `img_id` = ?');
								$stmt->execute([$user_id, $img_id]);
								$number_of_rows = $stmt->fetchColumn();
	
								if ($number_of_rows == 1)
									echo "<input type=\"submit\" class=\"btn btn-success\" name=\"dislike_image_button\" value=\"like\">";
	
								else
									echo "<input type=\"submit\" class=\"btn btn-outline-success\" name=\"like_button\" value=\"like\">";
	
								echo "</div>";
								echo "</form>";
								echo "</p>";
							}
							$stmt = $pdo->prepare('SELECT count(*) FROM likes WHERE `img_id` = ?');
							$stmt->execute([$img_id]);
							$number_of_rows = $stmt->fetchColumn();
							echo "<p>Likes: " . $number_of_rows . "</p>";
							// likes end

							// img delete starts
							if (isset($user_id))
							{
								if ($user_id == $owner_id || $_SESSION['admin'])
								{
									echo "<p>";
									echo "<form action=\"image.php\" method=\"POST\">";
									echo "<div class=\"form-group\">";
									echo "<input type=\"hidden\" name=\"img_id\" value=\"" . $img_id . "\">";
									echo "<input type=\"submit\" class=\"btn btn-danger\" name=\"delete_image_button\" value=\"X\">";
									echo "</div>";
									echo "</form>";
									echo "</p>";
								}
							}
							// img delete ends

							echo "<h3>Comments</h3>";

							if (isset($_SESSION['username']))
							{
								echo "<form action=\"" . $url . "\" method=\"POST\">";
								echo "<div class=\"form-group\">";
								echo "<textarea style=\"height: 100%;\" class=\"form-control\" placeholder=\"Enter comment\" name=\"comment\"></textarea>";
								echo "</div>";
								echo "<div class=\"form-group\">";
								echo "<input type=\"submit\" class=\"btn btn-primary center\" name=\"post_comment\" value=\"Post Comment\">";
								echo "</div>";
								echo "</form>";
							}
							else
								echo "<p><a href=\"login.php\">Log In</a> to comment.</p>";

							echo "<table class=\"table\">";
							echo "<th class=\"small\">TIME</th>";
							echo "<th class=\"small\">USER</th>";
							echo "<th class=\"small\">COMMENT</th>";
							echo "<th class=\"small\">DELETE</th>";
	
							$stmt = $pdo->prepare('SELECT `id`, `username`, `comment`, `created` FROM comments WHERE `img_id` = ? ORDER BY `created` DESC');
							$stmt->execute([$img_id]);
							$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
							foreach ($comments as $comment)
							{
								$time = date("H:i", strtotime($comment['created']));
								$id = $comment['id'];
								echo "<tr>";
								echo "<td class=\"text-black-50\">" . $time . "</td>";
								echo "<td class=\"font-weight-bold\">" . $comment['username'] . "</td>";
								echo "<td style=\"width:100%\">" . $comment['comment'] . "</td>";

								if ($comment['username'] == $_SESSION['username'] || $_SESSION['admin'])
								{
									echo "<td><form action=\"image.php\" method=\"POST\">";
									echo "<div class=\"form-group\">";
									echo "<input type=\"hidden\" name=\"delete\" value=\"" . $id . "\">";
									echo "<input type=\"submit\" class=\"btn btn-danger\" name=\"delete_comment_button\" value=\"X\">";
									echo "</form></td>";
								}
								else
									echo "<td></td>";
								echo "</tr>";
							}
							echo "</table>";
						}
						else
							echo "<p>No image found</p>";
					?>

				</div>
			</div>
			<div class="col-sm-4 border">
			<!-- right column -->

				<div id="inner2">
					<h3>Uploader</h3>
					<?php echo "<h4>" . $owner_username . "</h4>" ?>
				</div>
			</div>
		</div>

<?php require_once('templates/footer.php'); ?>