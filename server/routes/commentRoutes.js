const express = require('express');
const Comment = require('../models/Comment');
const { protect } = require('./userRoutes');

const router = express.Router();

// Add a new comment to a blog post
router.post('/add', protect, async (req, res) => {
  const { blogId, content } = req.body;

  try {
    const comment = new Comment({
      blogId,
      userId: req.user._id,
      content,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a reply to a comment
router.post('/reply/:id', protect, async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.replies.push({
      userId: req.user._id,
      content,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get comments for a blog post
router.get('/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).populate('userId', 'name').populate('replies.userId', 'name');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
