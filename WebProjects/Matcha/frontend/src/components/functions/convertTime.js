const convertTime = (timestamp) =>
{
	if (typeof timestamp !== "undefined")
	{
		var split = timestamp.split(/[T:]/);
		return split[0] + " " + split[1] + ":" + split[2];
	}
}

export default convertTime;