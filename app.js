"use strict";
console.log("Starting on: " + require("os").hostname().toLocaleLowerCase());
/**
 * Catch the uncaught errors that weren't wrapped in a domain or try catch statement
 * do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
 */
process.on("uncaughtException", (err) => {
  // handle the error safely
  console.log(err);
});

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

/** @module Server Runtime */
let express = require("express"),
  server = express(),

  // This dependency was missing so created it
  recognition = require("./js/recognition.js");

/**
 * Setup the basic server handling
 */
server.use(
  express.urlencoded({
    extended: true,
  })
);

// When route is accessed, call function with request params
server.get("/api-v2/recognise", (req) => recognition.recognisePath(req));

// If we are running inside IIS then bind to the port it asks us to
let portToOpen = process.env.PORT;
if (portToOpen === undefined) {
  portToOpen = 9090;
}

console.log("Port: " + portToOpen);

server.listen(portToOpen);
