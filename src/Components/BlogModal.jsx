// BlogModal.jsx
import React from 'react';
import { Heart, Share, MessageSquareMore} from 'lucide-react';

const BlogModal = ({ isOpen, blog, closeModal }) => {
  if (!isOpen) return null; 
  
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
        <p className="w-3/4 text-gray-600 mb-4 p-4">{blog.des}</p></div>
        <hr className='text-gray-300 mb-4'/>
        <div className='flex gap-3'>
          <Heart className="text-rose-400 hover:text-rose-800 hover:scale-110 transition-transform duration-300 border p-1 rounded-md"/>
          <Share className="text-cyan-400 hover:text-cyan-800 hover:scale-110 transition-transform duration-300 border p-1 rounded-md"/>
          <MessageSquareMore className="text-indigo-400 hover:text-indigo-800 hover:scale-110 transition-transform duration-300 border p-1 rounded-md"/>
        </div>
        <div className="flex justify-end">
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
