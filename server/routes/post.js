const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const Post = require('../models/Post');

//@route GET api/posts
//@desc get post
//@access private
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', [
      'username',
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
});

//@route POST api/posts
//@desc create post
//@access private
router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: 'Title is require' });

  try {
    const newPost = new Post({
      title,
      description: description || '',
      url: url ? (url.startsWith('https://') ? 'url' : `https://${url}`) : '',
      status: status || 'TO LEARN',
      user: req.userId,
    });

    await newPost.save();

    return res.json({
      success: true,
      message: 'Happy Learning!',
      post: newPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
});

//@route PUT api/posts
//@desc update post
//@access private
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: 'Title is require' });

  try {
    let updatedPost = {
      title,
      description: description || '',
      url: url ? (url.startsWith('https://') ? 'url' : `https://${url}`) : '',
      status: status || 'TO LEARN',
      user: req.userId,
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    if (!updatedPost)
      return res.status(401).json({
        success: false,
        messsage: 'Post not found or user not authorised',
      });

    res.json({
      success: true,
      message: 'Excellent progress!',
      post: updatedPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
});

//@route Delete api/posts
//@desc remove post
//@access private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };

    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    if (!deletedPost)
      return res.status(401).json({
        success: false,
        messsage: 'Post not found or user not authorised',
      });

    res.json({
      success: true,
      post: deletedPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
});

module.exports = router;
