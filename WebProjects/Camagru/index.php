<?php
	session_start();
	require_once('functions.php');
	$pdo = connect_db();
	$title = "Welcome to 10GAG";
	// log tail -f access_log
?>

<?php require_once('templates/header.php'); ?>

		<div class="row no-gutters">
			<div class="col-sm-8 border">
			<!-- center column -->
				<div id="inner2">
					<h3>TOP</h3>
					<?php
						$sql = "SELECT `id`, `name` FROM img_gallery ORDER BY `likes` DESC LIMIT 5";
						$sth = $pdo->prepare($sql);
						$sth->execute();
						$images = $sth->fetchAll(PDO::FETCH_ASSOC);
						foreach ($images as $image)
						{
							echo "<a href=\"image.php?img_id=" . $image['id'] . "\"><img class=\"img-thumbnail\" src=\"img/gallery/" . $image['name'] . "\"></a><br>";
						}
					?>
					</div>
			</div>
			<div class="col-sm-4 border">
			<!-- right column -->
				<div id="inner2">
					<h3>NEW</h3>
					<?php
						$sql = "SELECT `id`, `name` FROM img_gallery ORDER BY `id` DESC LIMIT 5";
						$sth = $pdo->prepare($sql);
						$sth->execute();
						$images = $sth->fetchAll(PDO::FETCH_ASSOC);
						foreach ($images as $image)
						{
							echo "<a href=\"image.php?img_id=" . $image['id'] . "\"><img class=\"img-thumbnail\" src=\"img/gallery/" . $image['name'] . "\"></a><br>";
						}
					?>
				</div>
			</div>
		</div>

<?php require_once('templates/footer.php'); ?>