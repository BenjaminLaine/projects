<?php
	if (isset($_POST['snake']) || isset($_POST['cat']) || isset($_POST['falcon']) || isset($_POST['wig']) || isset($_POST['money']) || isset($_POST['retro']))
	{
		$type = strtolower(pathinfo($_SESSION["image"], PATHINFO_EXTENSION));
	
		if ($type == "png")
			$dst = imagecreatefrompng("img/tmp/" . $img_name);
		else
			$dst = imagecreatefromjpeg("img/tmp/" . $img_name);
	
		imagealphablending($dst, true);
		imagesavealpha($dst, true);
	
		if (isset($_POST['snake']))
		{
			$src = imagecreatefrompng('img/site/snake.png');
			imagecopy($dst, $src, 0, 0, 0, 0, 1280, 720);
		}
	
		if (isset($_POST['cat']))
		{
			$src = imagecreatefrompng('img/site/cat.png');
			imagecopy($dst, $src, 0, 0, 0, 0, 1280, 720);
		}
	
		if (isset($_POST['falcon']))
		{
			$src = imagecreatefrompng('img/site/falcon.png');
			imagecopy($dst, $src, 0, 0, 0, 0, 1280, 720);
		}
	
		if (isset($_POST['wig']))
		{
			$src = imagecreatefrompng('img/site/wig.png');
			imagecopy($dst, $src, 0, 0, 0, 0, 1280, 720);
		}
	
		if (isset($_POST['money']))
		{
			$src = imagecreatefrompng('img/site/money.png');
			imagecopy($dst, $src, 0, 0, 0, 0, 1280, 720);
		}
	
		if (isset($_POST['retro']))
		{
			$src = imagecreatefrompng('img/site/retro.png');
			imagecopymerge($dst, $src, 0, 0, 0, 0, 1280, 720, 50);
		}
	
		if ($type == "png")
			imagepng($dst, 'img/tmp/'. $img_name);
		else
			imagejpeg($dst, 'img/tmp/'. $img_name);
	
		imagedestroy($dst);
		imagedestroy($src);
	}
?>