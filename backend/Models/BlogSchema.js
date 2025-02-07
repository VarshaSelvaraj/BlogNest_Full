import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: String,
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Blog = mongoose.model('Blog', blogSchema);
 export default Blog;