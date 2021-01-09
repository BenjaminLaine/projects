<form action="edit.php" method="POST">
		<div class="form-check-inline">
			<input class="form-check-input" name="snake" type="checkbox" id="defaultCheck1">
			<label class="form-check-label" for="defaultCheck1"><img src="img/site/snake.png" width="128" height="72">Snake</label>
		</div>
		<div class="form-check-inline">
			<input class="form-check-input" name="cat" type="checkbox" id="defaultCheck2">
			<label class="form-check-label" for="defaultCheck2"><img src="img/site/cat.png" width="128" height="72">Cat</label>
		</div>
		<div class="form-check-inline">
			<input class="form-check-input" name="falcon" type="checkbox" id="defaultCheck3">
			<label class="form-check-label" for="defaultCheck3"><img src="img/site/falcon.png" width="128" height="72">Falcon</label>
		</div>
		<div class="form-check-inline">
			<input class="form-check-input" name="wig" type="checkbox" id="defaultCheck4">
			<label class="form-check-label" for="defaultCheck4"><img src="img/site/wig.png" width="128" height="72">Wig</label>
		</div>
		<div class="form-check-inline">
			<input class="form-check-input" name="money" type="checkbox" id="defaultCheck5">
			<label class="form-check-label" for="defaultCheck5"><img src="img/site/money.png" width="128" height="72">Money</label>
		</div>
		<div class="form-check-inline">
			<input class="form-check-input" name="retro" type="checkbox" id="defaultCheck6">
			<label class="form-check-label" for="defaultCheck6"><img src="img/site/retro.png" width="128" height="72">Retro</label>
		</div>
		<?php if (isset($_SESSION['image'])) {?>
		<div class="form-group">
			<input type="submit" name="add_elements_button" class="btn btn-primary" value="Add Elements">
		</div>
		<div class="form-group">
			<input type="submit" name="clear_elements_button" class="btn btn-danger" value="Clear Elements">
		</div>
		<?php }?>
	</form>

<?php
	if (!empty($img_name))
	{
		echo "<p><img id=\"pic\" src=\"img/tmp/" . $img_name . "\"</img></p>";
		if (isset($success))
			echo "<p class=\"alert alert-success\">" . $success . "</p>";
		echo "<form action=\"edit.php\" method=\"POST\" enctype=\"multipart/form-data\">";
		echo "<p><input type=\"submit\" class=\"btn btn-success\" name=\"save\" value=\"Save Canvas\"></p>";
		echo "<p><input type=\"submit\" class=\"btn btn-danger\" name=\"clear_canvas\" value=\"Clear Canvas\"></p>";
		echo "</form>";
	}	
	else
	{
		echo "<p><img src=\"img/site/no-image.jpg\"</img></p>";
		echo "<form action=\"edit.php\" method=\"POST\" enctype=\"multipart/form-data\">";
		echo "<p><input type=\"file\" name=\"image\" id=\"image\"></p>";
		echo "<p><input type=\"submit\" class=\"btn btn-primary\" name=\"upload\" value=\"Upload Image\"></p>";
		echo "</form>";
		if (isset($error))
			echo "<p class=\"alert alert-danger\">" . $error . "</p>";
	}
?>