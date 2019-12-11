const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

  // - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
  // - this middleware runs on every request made to the API

function logger(req, res, next) {
	console.log(`[${new Date().toISOString()}] - ${req.method} - ${req.url} - ${req.get("User-Agent")}`)
	next()
}

server.use(logger)

module.exports = server;
