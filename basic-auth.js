//app.js

const express = require("express");
const basicAuth = require("express-basic-auth");
const app = express();

app.use(
	basicAuth({
		users: { username: "password" , 'admin':'admin'},
		challenge: true,
		unauthorizedResponse:
			"Unauthorized access. Please provide valid credentials.",
	})
);

app.get("/secure-data", (req, res) => {
	res.send("This is secure data that requires valid credentials.");
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});


