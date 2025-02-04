import React from 'react';
import { MessagesSquare, Search } from 'lucide-react';

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-transparent p-4 flex justify-between items-center z-50">
      {/* Left section (logo and message icon) */}
      <div className="flex gap-2 items-center text-lg">
        <MessagesSquare />
        <span className="text-2xl font-bold">BlogNest</span>
      </div>
      <form class="max-w-md mx-auto">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" class="block w-md p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search blogs..." required />
                <button type="submit" class="text-white absolute mr-2.5 end-2.5 bottom-2.5 bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
      </form>
      
      
    </div>
  );
};

export default NavBar;
