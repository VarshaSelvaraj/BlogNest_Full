import React from 'react';
import {Link} from 'react-router-dom';
import { MessagesSquare, Search } from 'lucide-react';

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full   bg-gray-50  p-4 flex justify-between items-center z-50 font-mono">

      <div className="flex gap-2 items-center text-lg">
        <MessagesSquare  className='text-gray-500'/>
        <span className="text-xl text-gray-500 font-bold">blognest.com</span>
      </div>
      <form className="max-w-md mx-auto">   
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokellinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-md p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search blogs..." required />
                <Link to='/blogs'><button type="submit" className="text-gray absolute mr-2.5 end-2.5 bottom-2.5 bg-blue-200 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 hover:bg-blue-100 dark:focus:ring-blue-800">Search</button></Link>
            </div>
      </form>
    </div>
  );
};

export default NavBar;
