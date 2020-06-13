// const express = require("express");
// const path = require("path");
// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static("./dist/imtd-client-v2.json"));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/dist/imtd-client-v2/index.html"));
// });

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);

const express = require("express");
const path = require("path");
const app = express();

// Serve static files....
app.use(express.static(__dirname + "/dist/imtd-client-v2"));

// Send all requests to index.html
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/imtd-client-v2/index.html"));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
