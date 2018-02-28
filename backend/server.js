import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./router";
var fs = require("fs");
import session from "express-session";
import bodyParser from "body-parser";
import SpotifyWebApi from "spotify-web-api-node";
import socketio from "socket.io";
// const MongoStore = require("connect-mongo")(session);

//load all models
fs.readdirSync(__dirname + "/models").forEach(function(filename) {
  if (~filename.indexOf(".js")) require(__dirname + "/models/" + filename);
});

const db = mongoose.connection;

// Initialize http server
const app = express();

// Logger that outputs all requests into the console
app.use(morgan("combined"));
// Use v1 as prefix for all API endpoints
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.options("*", function(req, res) {
  "use strict";
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Connection", "keep-alive");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.use("/v1", router);

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
