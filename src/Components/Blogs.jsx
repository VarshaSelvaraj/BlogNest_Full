import React, { useEffect, useState } from 'react';
import { BookOpenText, FilePenLine, Trash2, Eye } from 'lucide-react';
import NavBar from './NavBar';
import BlogModal from './BlogModal';
import EditBlogModal from './EditBlogModal';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    blog.views += 1;
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


  const editBlog = (id) => {
    const blogToEdit = blogs.find((blog) => blog.id === id);
    setEditingBlog(blogToEdit);
    setIsEditModalOpen(true);
    document.getElementById('blogsContainer').classList.add('blur-md');
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingBlog(null);
    document.getElementById('blogsContainer').classList.remove('blur-md');
  };

  const saveEditedBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    closeEditModal();
  };

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  return (
    <>
      <NavBar />
      <br /> <br /> <br /> 
      <div id="blogsContainer" className="flex flex-col items-center font-mono bg-gray-50 ">
        {blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between mt-6  mb-8 p-7 border-gray rounded-lg shadow-xl w-3/4"
            >
              <div className="w-3/5">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-5 mr-3">{blog.des}</p>
                <div className="flex gap-3">
                  <p className="flex items-center text-gray-400 mr-4">
                    <Eye className="mr-1 text-green-200" />
                    {blog.views}
                  </p>
                  <BookOpenText
                    onClick={() => openModal(blog)}
                    className="text-blue-300 hover:text-blue-500 hover:scale-110 transition-transform duration-300 border p-1 rounded-md cursor-pointer"
                  />
                  <FilePenLine
                    onClick={() => editBlog(blog.id)}
                    className="text-orange-300 hover:text-orange-500 hover:scale-110 transition-transform duration-300 border p-1 rounded-md cursor-pointer"
                  />
                  <Trash2
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-300 hover:text-red-500 hover:scale-110 transition-transform duration-300 border p-1 rounded-md cursor-pointer"
                  />
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
     
     <EditBlogModal
  isOpen={isEditModalOpen}
  blog={editingBlog} // Updated to match the expected prop name
  onClose={closeEditModal}
  onSave={saveEditedBlog}
/>

      
    </>
  );
};
