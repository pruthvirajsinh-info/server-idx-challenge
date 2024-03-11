const express = require("express");
const app = express();

app.get("/", (req, res) => {
	const data = "Hello, Pruthvirajsinh! Enter a valid URL";
	const callbackFn = req.query.callback;
	const url = req.query.url;
	console.log(url);
	// https://reqres.in/api/users
	res.header("Content-Type", "application/javascript");

	if (url) {
		console.log("url", url);
		fetch(url)
			.then((res) => res.json())
			.then((dt) => {
				console.log(dt);
				const responseData = `${callbackFn}(${JSON.stringify(dt)})`;
				return res.send(responseData);
			})
			.catch((er) => {
				const responseData = `${callbackFn}(${JSON.stringify(er.message)})`;
				return res.send(responseData);
			});
	} else {
		const responseData = `${callbackFn}(${JSON.stringify(data)})`;
		console.log(responseData);
		return res.send(responseData);
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`API server listening at http://localhost:${PORT}`);
});
