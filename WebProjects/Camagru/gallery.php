<?php
	session_start();
	
	require_once('functions.php');
	$pdo = connect_db();

	$page = isset($_GET['page']) ? $_GET['page'] : 0;
	$start = $page > 0 ? $_GET['page'] * 10 : 0;

	$sql = $pdo->prepare("SELECT `id` FROM img_gallery");
	$sql->execute();
	$rows = $sql->fetchAll(PDO::FETCH_COLUMN);
	$plus = count($rows) % 10 == 0 ? 0 : 1;
	$page_amount = ((int)(count($rows) / 10) + $plus);
?>

<?php require_once("templates/header.php"); ?>

	<div class="row no-gutters">
		<div class="col-sm border">
		<!-- center column -->
			<div id="inner2">
				<h3>Gallery</h3>
				<?php
				$sql = "SELECT `id`, `name` FROM img_gallery ORDER BY `id` DESC LIMIT " . $start . ", 10";
				$sth = $pdo->prepare($sql);
				$sth->execute();
				$images = $sth->fetchAll(PDO::FETCH_ASSOC);
				foreach ($images as $image)
				{
					echo "<a href=\"image.php?img_id=" . $image['id'] . "\"><img class=\"img-thumbnail\" src=\"img/gallery/" . $image['name'] . "\"></a><br>";
				}
				echo "<nav>";
				echo "<ul class=\"pagination pagination-sm\">";
				if ($page == 0)
					echo "<li class=\"page-item disabled\"><a class=\"page-link\">Previous</a></li>";
				else
					echo "<li class=\"page-item\"><a class=\"page-link\" href=\"gallery.php?page=".($page-1)."\">Previous</a></li>";
				echo "</li>";
				for ($i = 0; $i < $page_amount; $i++)
				{
					if ($page != $i)
						echo "<li class=\"page-item\"><a class=\"page-link\" href=\"gallery.php?page=".$i."\">".$i."</a></li>";
					else
						echo "<li class=\"page-item disabled\"><a class=\"page-link\" href=\"#!\">" . $i . "</a></li>";
				}
				if ($page < $page_amount-1)
					echo "<li class=\"page-item\"><a class=\"page-link\" href=gallery.php?page=".($page+1).">Next</a>";
				else
					echo "<li class=\"page-item disabled\"><a class=\"page-link\">Next</a>";
				echo "</li>";
				echo "</ul>";
				echo "</nav>";
				?>
			</div>
		</div>
	</div>

<?php require_once("templates/footer.php"); ?>