// Setup empty JS object to act as endpoint for all routes
var projectData = {};
const port = 3000;

// Require Express to run server and routes
// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("dist"));

//setup server
const server = app.listen(port, listening);

function listening() {
  // console.log("server running");
  // console.log("running on localhost:" + port);
}

app.get("/getdata", function (req, res) {
  res.send(projectData);
});
app.post("/postdata", postdata);

export function postdata(req, res) {

  projectData["temperature"] = req.body.temperature;
  projectData["date"] = req.body.date;
  projectData["feelings"] = req.body.feelings;
  
  res.send(projectData);
}
export {server};