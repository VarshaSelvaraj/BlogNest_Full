// backend/routes/blogRoutes.js

import express from 'express';
import Blog from '../Models/BlogSchema.js';

const router = express.Router();

// POST route to create a blog
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
    const { views } = req.body; // Get the updated views count from the request body
  
    try {
      // Find the blog by _id and update the views count
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { views }, // Update the views field
        { new: true } // Return the updated blog
      );
      res.json(updatedBlog);
    } catch (error) {
      console.error('Error updating views:', error);
      res.status(500).json({ error: 'Failed to update views' });
    }
  });
  

export default router;
