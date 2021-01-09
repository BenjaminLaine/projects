<script>
	const canvas = document.getElementById('canvas');
	const pic = document.getElementById('pic');
	const vidsize = {video: {width: 1280, height: 720}};
	window.onload = function check_stream()
	{
		navigator.getMedia = ( navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia);
			navigator.getMedia(vidsize, function() {
			webcam.style.display="block";
			init();
		},
		function()
		{
			webcam_error.style.display="block";
		});
	}

	async function init()
		{
			if (pic)
				webcam.style.display="none";
			const video = document.getElementById('video');
			const stream = await navigator.mediaDevices.getUserMedia(vidsize);
			video.srcObject = stream;
			canvas.style.display="none";
		}

	function post(path, params, method='post')
	{
		const form = document.createElement('form');
		form.method = method;
		form.action = path;
		for (const key in params)
		{
			if (params.hasOwnProperty(key))
			{
				const hiddenField = document.createElement('input');
				hiddenField.type = 'hidden';
				hiddenField.name = key;
				hiddenField.value = params[key];
				form.appendChild(hiddenField);
			}
		}
		document.body.appendChild(form);
		form.submit();
	}
	async function draw_canvas()
	{
		var context = canvas.getContext("2d");
		await context.drawImage(video, 0, 0);
		var dataURL = canvas.toDataURL('image/png');
		post('edit.php', {'webcam': dataURL});
	}
</script>