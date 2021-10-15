const express = require("express");
const fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public/assets", express.static("./public/assets"));

require("./routes/html_routes")(app);
require("./routes/api_routes")(app);

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
