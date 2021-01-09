<?php
	session_start();

	// if not logged in, redirect to login.php
	if (!isset($_SESSION['username']))
	{
		header("location: login.php", true, 301);
		exit;
	}

	// if not activated in, redirect to not_activated.php
	if ($_SESSION['activated'] == 0)
	{
		header("Location: activate.php", true, 301);
		exit;
	}

	require_once('functions.php');
	$pdo = connect_db();

	$user_id = $_SESSION['id'];
	if (isset($_SESSION['image']))
		$img_name = $_SESSION['image'];

	require_once('edit/edit_POST.php');
?>

<?php require_once("templates/header.php"); ?>

	<div class="row no-gutters">
			<div class="col-sm-8 border">
			<!-- center column -->
				<div id="inner2">
					<h3>Edit</h3>
					<?php require_once('edit/edit_forms.php');?>

				</div>
			</div>
			<div class="col-sm-4 border">
			<!-- right column -->
				<div id="inner2">
					<h3>Webcam</h3>
					<p style="display:none;" id="webcam_error">No Webcam Access.</p>

					<div style="display:none;" id="webcam">
						<div id="button">
							<p><video autoplay="true" id="video"></video></p>
							<p><button class="btn btn-primary" onclick="draw_canvas()">Capture</button></p>
						</div>
						<canvas type="hidden" id="canvas" width="1280" height="720"></canvas>
					</div>

				<div id="inner2">
					<h3>My Last 5 Images</h3>

					<?php
						$owner_id = $_SESSION['id'];
						$stmt = $pdo->prepare('SELECT `id`, `name` FROM img_gallery WHERE `owner_id` = ? ORDER BY `id` DESC LIMIT 5');
						$stmt->execute([$owner_id]);
						$images = $stmt->fetchAll(PDO::FETCH_ASSOC);

						foreach ($images as $image)
						{
							echo "<a href=\"image.php?img_id=" . $image['id'] . "\"><img class=\"img-thumbnail\" src=\"img/gallery/" . $image['name'] . "\"></a>";
						}
					?>

				</div>
			</div>
		</div>
	</div>
	<?php require_once('edit/edit_script.php')?>

<?php require_once("templates/footer.php"); ?>