import React from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="bg-[url(https://cdn.dribbble.com/users/4435100/screenshots/15114878/media/4c6a0c6609a93d143bb24302f91a8657.gif)] bg-no-repeat bg-cover w-screen h-screen flex items-center justify-center font-mono relative">

        <div className="absolute left-10 bottom-20 bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl pb-3 font-bold text-black">"Get inspired by others, then share your own journey"</h1>
          <h2 className="text-2xl pb-3 font-medium text-black">Easily craft your blogs here..</h2>
          <Link to="/addblog">
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
              Create your blog
            </button>
          </Link>
        </div>
        <div className="absolute right-10 top-20 bg-white/30 backdrop-blur-md p-10 rounded-lg shadow-lg w-100">
          <h1 className="text-3xl  pb-3 font-bold text-black">"Discover stories that inspire"</h1>
          <h2 className="text-2xl pb-3 font-medium text-black">Dive into amazing blogs..</h2>
          <Link to="/blogs">
            <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5">
              Explore Blogs
            </button>
          </Link>
        </div>

      </div>
    </>
  );
};

export default Home;
