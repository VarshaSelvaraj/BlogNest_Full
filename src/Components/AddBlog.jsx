import { useState } from 'react';
import NavBar from './NavBar';

export const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');

  const storeData = (e) => {
    e.preventDefault();
    if (!title || !description || !img) {
      alert('Please fill in all fields');
    } else {
      const data = {
        title: title,
        des: description,
        img: img,
        views: 0,
        id: Date.now(),
      };
      const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
      blogs.push(data);
      localStorage.setItem('blogs', JSON.stringify(blogs));
      alert('Hurrah! Added your blog');
      setTitle('');
      setDescription('');
      setImg('');
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen font-mono   bg-gray-50 mt-5 p-10">
        <div className="flex flex-col md:flex-row border-box bg-white shadow-lg rounded-lg overflow-hidden">
    
          <div className="md:w-1/2 border-box p-15">
            <h1 className="text-2xl font-semibold mb-6">Create your blog here!</h1>
            <form id="add-blog" className="flex flex-col space-y-4" onSubmit={storeData}>
              <input
                type="text"
                value={title}
                id="title"
                className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Your blog title..."
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                id="description"
                value={description}
                placeholder="Your blog description..."
                className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 h-32 resize-none"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                id="imgurl"
                value={img}
                className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Your blog image URL..."
                onChange={(e) => setImg(e.target.value)}
              />
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
               
              >
                Add Blog
              </button>
            </form>
          </div>

          <div className="md:w-1/2">
            <img
              src="https://i.pinimg.com/originals/cf/51/ad/cf51ad748537f4ea6899ab44388ad110.gif"
              alt="Blog Illustration"
              className="w-150 h-120 object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};
