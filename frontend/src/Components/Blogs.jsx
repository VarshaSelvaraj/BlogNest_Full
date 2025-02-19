import React, { useEffect, useState } from 'react';
import { BookOpenText, FilePenLine, Trash2, Eye, MessageSquareQuote, Frown, Heart } from 'lucide-react';
import NavBar from './NavBar';
import BlogModal from './BlogModal';
import EditBlogModal from './EditBlogModal';
import axios from 'axios';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [commentsData, setCommentsData] = useState({}); 
  const [alertMessage, setAlertMessage] = useState(null);
  const [editMessage, setEditMessage] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getblogs');
      console.log(response.data);
      setBlogs(response.data); 
      
     
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const commentsMap = {};
        for (const blog of blogs) {
          const response = await axios.get(`http://localhost:5000/api/comments/${blog._id}`);
          commentsMap[blog._id] = response.data;
        }
        setCommentsData(commentsMap);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    if (blogs.length > 0) {
      fetchAllComments();
    }
  }, [blogs]);  
  
  

  const openModal = async (blog) => {
    document.getElementById('blogsContainer').classList.add('blur-md');
    const updatedBlog = { ...blog, views: blog.views + 1 };
    setSelectedBlog(updatedBlog);
    setIsModalOpen(true);
  
    setBlogs((prevBlogs) => prevBlogs.map((b) => (b._id === blog._id ? updatedBlog : b)));
 
    try {
      await axios.put(`http://localhost:5000/api/updateviews/${blog._id}`, updatedBlog);
      console.log(`Views updated for blog ID: ${blog._id}`);
  
      
    } catch (error) {
      console.error('Error updating views or fetching comments:', error);
    }
  };
  
  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    document.getElementById('blogsContainer').classList.remove('blur-md');
    fetchBlogs();
  };

  const editBlog = (id) => {
    const blogToEdit = blogs.find((blog) => blog._id === id);
    setEditingBlog(blogToEdit);
    setIsEditModalOpen(true);
    document.getElementById('blogsContainer').classList.add('blur-md');
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingBlog(null);
    document.getElementById('blogsContainer').classList.remove('blur-md');
  };

  const saveEditedBlog = async (updatedBlog) => {
    try {
      console.log("Updated Blog ID:", updatedBlog._id);
      const response = await axios.put(`http://localhost:5000/api/editblog/${updatedBlog._id}`, updatedBlog);
      console.log(response.data);

      const updatedBlogs = blogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );
      setBlogs(updatedBlogs);
      closeEditModal();
      setEditMessage('Edited successfully');
      setTimeout(() => {
        setEditMessage(null);
      }, 2000);
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  const deleteBlog = async (blog) => {
    console.log('Deleting blog:', blog); 
  
    if (!blog || !blog._id) {
      console.error('Blog or Blog ID is missing');
      return; 
    }
  
    try {
      await axios.delete(`http://localhost:5000/api/deleteblog/${blog._id}`);
      console.log(`Blog with ID ${blog._id} deleted`);
  
      const updatedBlogs = blogs.filter((b) => b._id !== blog._id); 
      setBlogs(updatedBlogs);
  
      setAlertMessage('Blog deleted');
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
  
      const updatedComments = { ...commentsData };
      delete updatedComments[blog._id];
      setCommentsData(updatedComments);
    } catch (error) {
      console.error('Error deleting blog:', error);
      setAlertMessage('Error deleting blog');
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    }
  };
  
  return (
    <>
      <NavBar />
      <br /> <br /> <br />
      {alertMessage && (
      <div className="bg-orange-100 border-l-4 border-orange-500 p-7 font-mono text-lg text-orange-700  fixed" role="alert">
        <p className='flex gap-2'><Frown/>{alertMessage}</p>
      </div>)}
      {editMessage && (
        <div className="bg-amber-100 border-l-4 border-amber-500 p-7 font-mono text-lg text-amber-700  fixed" role="alert">
          <p className='flex gap-2'><FilePenLine/>{editMessage}</p>
        </div>
    )}
      <div id="blogsContainer" className="flex flex-col items-center font-mono bg-gray-50">
        {blogs.length === 0 ? (
          <p className='p-10'>No blogs added yet...</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col items-start mt-6 mb-8 p-7 border-gray rounded-lg shadow-xl w-3/4 bg-white"
            >
             <div className="flex w-full">
         
          <div className="w-3/5 flex flex-col">
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-5 mr-3">
              {blog.description.length > 100 ? blog.description.slice(0, 300) + '...' : blog.description}
            </p>
            
      
            <div className="flex gap-3">
              <p className="flex items-center text-gray-400 mr-4">
                <Eye className="mr-1 text-green-200" />
                {blog.views}&emsp;
                <Heart className="mr-1 text-rose-200" />
                {blog.likes}
              </p>

              <BookOpenText
                onClick={() => openModal(blog)}
                className="text-blue-300 hover:text-blue-500 hover:scale-150 transition-transform duration-300 border p-1 rounded-md cursor-pointer"
              />
              <FilePenLine
                onClick={() => editBlog(blog._id)}
                className="text-orange-300 hover:text-orange-500 hover:scale-150 transition-transform duration-300 border p-1 rounded-md cursor-pointer"
              />
              <Trash2
                onClick={() => deleteBlog(blog)}
                className="text-red-300 hover:text-red-500 hover:scale-150 transition-transform duration-300 border p-1 rounded-md cursor-pointer"
              />
            </div>

         
            <div className="flex flex-wrap gap-2 mt-4 w-full">
              {commentsData[blog._id] && commentsData[blog._id].length > 0 ? (
                commentsData[blog._id].map((comment, index) => (
                  <div key={index} className="flex items-center bg-white p-2 rounded-md shadow-sm gap-2">
                    <MessageSquareQuote className="text-indigo-400 p-1 rounded-md" />
                    <span className='text-zinc-500'>{comment.text}</span>
                  </div>
                ))
              ) : (
                <p className="flex gap-2 text-gray-500">
                  <MessageSquareQuote className="text-indigo-400 p-1 rounded-md" />
                  No comments yet.
                </p>
              )}
            </div>
          </div>

     
          <div className="w-2/5 flex justify-end">
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>


              
            </div>
          ))
        )}
      </div>

      <BlogModal isOpen={isModalOpen} blog={selectedBlog} closeModal={closeModal} />

      <EditBlogModal
        isOpen={isEditModalOpen}
        blog={editingBlog}
        onClose={closeEditModal}
        onSave={saveEditedBlog}
        
      
      />
    </>
  );
};
