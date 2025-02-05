import React, { useState, useEffect } from 'react';
import { Heart, Share, MessageSquareMore } from 'lucide-react';

const BlogModal = ({ isOpen, blog, closeModal }) => {
  if (!isOpen) return null;

  const getStoredComments = () => {
    const storedData = JSON.parse(localStorage.getItem("blogComments")) || {};
    return storedData[blog.id] || []; 
  };

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(getStoredComments);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (isOpen) {
      setComments(getStoredComments());
    }
  }, [isOpen]);
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
      alert('you commented on a blog!');
      setNewComment(""); 
      setShowComments(!showComments);
      
    }
  };

  return (
    <div className="font-mono fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
      
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
          <Heart className="text-rose-400 hover:text-rose-800 hover:scale-110 transition-transform duration-300 border p-1 rounded-md"/>
          <Share className="text-cyan-400 hover:text-cyan-800 hover:scale-110 transition-transform duration-300 border p-1 rounded-md"/>
          <MessageSquareMore 
            className="text-indigo-400 hover:text-indigo-800 hover:scale-110 transition-transform duration-300 border p-1 rounded-md"
            onClick={handleToggleComments} 
          />
        </div>
              {showComments && (
                  <div className="mt-4 p-4 rounded-md shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..." 
                        className="border p-2 w-full rounded-md"
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
  );
};

export default BlogModal;
