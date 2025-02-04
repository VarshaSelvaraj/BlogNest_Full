import React, { useEffect, useState } from 'react';
import {BookOpenText, FilePenLine, Trash2, Eye } from 'lucide-react';
import NavBar from './NavBar';
import BlogModal from './BlogModal';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);
  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    blog.views+=1;
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.map((b) =>
        b.id === blog.id ? { ...b, views: blog.views } : b
      );
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs; 
    });
      
    document.getElementById('blogsContainer').classList.add('blur-md');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    document.getElementById('blogsContainer').classList.remove('blur-md');
  };


  return (
    <>
    <NavBar/>
    <br/>  <br/>  <br/>  <br/>
      <div id="blogsContainer" className="flex flex-col items-center font-mono ">
       
        {!blogs ? (
          <p>No blogs available.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between mb-8 p-7 border-gray rounded-lg shadow-xl w-3/4"
            >
              <div className="w-3/5">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-5">{blog.des}</p>
                <div className='flex gap-3'>
                  <p className="left-10 bottom-20 text-gray-400 mr-4 flex"> <Eye className='mr-1 text-green-200'/>{blog.views}</p>
                  <BookOpenText onClick={() => openModal(blog)} 
                  className="text-blue-300 hover:text-blue-500 hover:scale-110 transition-transform duration-300 border p-1 rounded-md"/>
                  <FilePenLine className="text-orange-300 hover:text-orange-500 hover:scale-110 transition-transform duration-300 border p-1 rounded-md"/>
                  <Trash2  className="text-red-300 hover:text-red-500 hover:scale-110 transition-transform duration-300 border p-1 rounded-md"/>
                </div>

              </div>
              <div className="w-2/5">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          ))
        )}
      </div>
      <BlogModal
        isOpen={isModalOpen}
        blog={selectedBlog}
        closeModal={closeModal}
      />
    </>
  );
};
