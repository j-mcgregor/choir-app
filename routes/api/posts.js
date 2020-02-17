const express = require('express');
const router = express.Router();

const validatePostInput = require('../../validation/post');

const Post = require('../../models/Post');

/**
 * @route GET api/posts
 * @desc Fetch posts
 * @access public
 *
 */

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) throw Error();

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

/**
 * @route POST api/posts/create
 * @desc Create post
 * @access private
 *
 */

router.post('/create', async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    title: req.body.title,
    body: req.body.body
  });

  try {
    const post = await newPost.save();
    if (!post) throw Error();

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

/**
 * @route GET api/posts/:id
 * @desc Fetch single post
 * @access public
 *
 */

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({ _id: id });
    if (!post) throw Error();

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

/**
 * @route PUT api/posts/:id/update
 * @desc Edit a post
 * @access public
 *
 */

router.put('/:id/update', async (req, res) => {
  const { id } = req.params;
  const updatedPost = {
    title: req.body.title,
    body: req.body.body
  };
  try {
    const post = await Post.findByIdAndUpdate(id, updatedPost);
    if (!post) throw Error();

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

/**
 * @route DELETE api/posts/:id
 * @desc Delete a post
 * @access public
 *
 */

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
