const express = require('express');
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const server = express();

server.use(logger)
server.use(express.json())
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

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

server.use((err, req, res, next) => {
	res.status(500).json({
		message: "Oops, something went wrong", err
	})
})

module.exports = server;
