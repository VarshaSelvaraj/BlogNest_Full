

import express from 'express';
import Blog from '../Models/BlogSchema.js';
import Comment from '../Models/CommentsSchema.js';


const router = express.Router();

//createblog
router.post('/addblogs', async (req, res) => {
  const { title, description, img } = req.body;

  if (!title || !description || !img) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
  const newBlog = new Blog({
    title,
    description,
    img
  });

  try {
    await newBlog.save();
    res.status(200).json({ message: 'Successfully added your blog' });
    console.log('added');
  } catch (error) {
    res.status(500).json({ message: 'Error adding the blog' });
    console.log('error');
  }
});

// GET 
router.get('/getblogs', async (req, res) => {
  try {
    const myblogs = await Blog.find();
    res.status(200).json(myblogs);
  } catch (error) {
    res.status(500).json({ message: 'Error getting the blog' });
    console.log('error');
  }
});

// PUT 
router.put('/editblog/:id', async (req, res) => {
  const { title, description, img } = req.body;
  const blogId = req.params.id;

  if (!title || !description || !img) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description, img },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Successfully updated the blog', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating the blog' });
    console.log('error');
  }
});

// DELETE
router.delete('/deleteblog/:id', async (req, res) => {
  const blogId = req.params.id;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Successfully deleted the blog' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the blog' });
    console.log('error');
  }
});

//uppdateviews
router.put('/updateviews/:id', async (req, res) => {
    const blogId = req.params.id;
    const { views } = req.body; 
  
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { views }, 
        { new: true } 
      );
      res.json(updatedBlog);
    } catch (error) {
      console.error('Error updating views:', error);
      res.status(500).json({ error: 'Failed to update views' });
    }
  });

  //update likes
  router.put('/like/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      blog.likes += 1;  
      await blog.save();
  
      res.status(200).json({ likes: blog.likes });
    } catch (error) {
      console.error('Error updating likes:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// addcomment
router.post('/addcomment', async (req, res) => {
  try {
    const { blogId, text } = req.body;
    const newComment = new Comment({ blogId, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// getcomments
router.get('/comments/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});


export default router;
