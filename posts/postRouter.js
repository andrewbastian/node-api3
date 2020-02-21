const express = require('express');

const router = express.Router();

const Posts = require('./postDb')

router.get('/', async (req, res) => {
  try {
  	const posts = await Posts.get(req.query)
  	res.status(200).json(posts)
  } catch (err) {
  	console.log(err)
  	res.status(500).json({ error: "post data not found"})
  }
});

router.get('/:id', validatePostId, async (req, res, next) => {
  try {
  	res.json(await Posts.getById(req.params.id))
  } catch (err) {
  	next(err)
  }
});

router.delete('/:id', validatePostId, async (req, res, next) => {
  try {
  	await Posts.remove(req.params.id)
  	res.status(200).json({ message: 'post has been removed from database'})
  	end()
  } catch(err) {
  	next(err)
  }
});

router.put('/:id', validatePost, validatePostId, async (req, res, next) => {
  try {
  	const payload = {
  		text: req.body.text,
  	}
  	await Posts.update(req.params.id, payload)
  	res.json(await Posts.getById(req.params.id))
  } catch(err) {
  	next(err)
  }
});

// custom middleware

function validatePost(req, res, next) {
      if (!req.body.text) {
      return res.status(400).json({
        message: 'Missing post data'
      })
    } else {
    next()
  }
}

async function validatePostId(req, res, next) {
   try {
   	const post = await Posts.getById(req.params.id)

   	if (post) {
   		req.post = post
   		next()
   	} else {
   		res.status(404).json({ message: "post not found"})
   	}
   } catch(err) {
   	console.log(err)
   	next(err)
   }
}

module.exports = router;
