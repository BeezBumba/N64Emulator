if ("serviceWorker" in navigator)
	{
	navigator.serviceWorker.register("sw.js").then(function(registration)
	{
	// Registration successful
	}).catch(function(err)
	{
	// Registration failed
	});
}
