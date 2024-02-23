	if ("serviceWorker" in navigator)
				{
				navigator.serviceWorker.register("worker.js").then(function(registration)
					{
					// Registration successful
					//console.log("ServiceWorker registration successful with scope: " + registration.scope);
					}).catch(function(err)
					{
					// Registration failed
					//console.log("ServiceWorker registration failed: " + err);
					});
				}
