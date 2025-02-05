import React, { useState, useEffect } from 'react';
import { Heart, Share, MessageSquareMore, MessageSquareQuote, Facebook, Twitter,Linkedin } from 'lucide-react';

const BlogModal = ({ isOpen, blog, closeModal }) => {
  if (!isOpen) return null;

  const getStoredComments = () => {
    const storedData = JSON.parse(localStorage.getItem("blogComments")) || {};
    return storedData[blog.id] || []; 
  };

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(getStoredComments);
  const [newComment, setNewComment] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [likeMessage, setLikeMessage] = useState(null);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setComments(getStoredComments());
    }
   
    
  }, []);
  const handleToggleComments = () => {
    setShowComments(!showComments);
  };
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const updatedComments = [...comments, newComment];

      const storedData = JSON.parse(localStorage.getItem("blogComments")) || {};
      storedData[blog.id] = updatedComments; 
      localStorage.setItem("blogComments", JSON.stringify(storedData));

      setComments(updatedComments);
      setAlertMessage('You commented has been posted');
      setNewComment(""); 
      setShowComments(!showComments);
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
      
    }
  };
  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const updatedBlogs = storedBlogs.map((b) =>
      b.id === updatedBlog.id ? updatedBlog : b
    );
    setLikeMessage('You liked this blog');
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  
  };
 
  const toggleShareDropdown = () => {
    setIsShareDropdownOpen(!isShareDropdownOpen);
  };

  return (
    <>
    
    <div className="font-mono fixed inset-0 flex justify-center items-center z-50">
    
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
      {alertMessage && (
      <div className="bg-purple-100 border-l-4 border-purple-500 p-3 mb-2 font-mono  text-purple-700 p-4" role="alert">
        <p className='flex gap-2'><MessageSquareQuote/>{alertMessage}</p>
      </div>)}
      {likeMessage && (
      <div className="bg-red-100 border-l-4 border-red-200 p-3 mb-2 font-mono  text-red-300 p-4" role="alert">
        <p className='flex gap-2'><Heart />{likeMessage}</p>
      </div>)}
        <h2 className="text-3xl font-semibold mb-4">{blog.title}</h2>
        <hr className='text-gray-300'/>
        <div className='flex'>
          <img
            src={blog.img}
            alt={blog.title}
            className="w-1/4 h-auto rounded-lg mt-4 mb-4 mr-5"
          />
          <p className="w-3/4 text-gray-600 mb-4 p-4">{blog.des}</p>
        </div>
        <hr className='text-gray-300 mb-4'/>

        <div className='flex gap-3'>
          <Heart onClick={handleLike}
          className="text-rose-400 hover:text-rose-800 hover:scale-150 transition-transform duration-300 border p-1 rounded-md cursor-pointer"/>
          <Share   onClick={toggleShareDropdown}
          className="text-cyan-400 hover:text-cyan-800 hover:scale-150 transition-transform duration-300 border p-1 rounded-md cursor-pointer"/>
          <MessageSquareMore 
            className="text-indigo-400 hover:text-indigo-800 hover:scale-150 transition-transform duration-300 border p-1 rounded-md cursor-pointer"
            onClick={handleToggleComments} 
          />

        </div>
        {isShareDropdownOpen && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-md w-48 p-2">
            <div className="flex flex-col">
              <a href='https://www.facebook.com/' target='_blank'><button className="flex gap-1 text-blue-600 hover:text-zinc-700 mb-2"><Facebook className='text-blue-600'/>Facebook</button></a>
              <a href='https://twitter.com/' target='_blank'><button className="flex gap-1 text-green-600 hover:text-zinc-700 mb-2"><Twitter className='text-green-600'/>Twitter</button></a>
              <a href='https://in.linkedin.com/' target='_blank'><button className="flex gap-1 text-sky-500 hover:text-zinc-700"><Linkedin className='text-sky-500' />LinkedIn</button></a>
            </div>
          </div>
        )}

              {showComments && (
                  <div className="mt-4 p-4 rounded-md shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..." 
                        className=" p-2 w-full rounded-md"
                      />
                      <button 
                        onClick={handleAddComment} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}


        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogModal;
