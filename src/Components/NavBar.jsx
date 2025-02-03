import React from 'react'
import {Link} from 'react-router-dom';
import { MessagesSquare } from 'lucide-react';

const NavBar = () => {
  return (
    <div><div>
        <ul className="flex bg-gray-200 p-4 gap-20">
            <div className='flex gap-2 text-lg'>
               <li>< MessagesSquare/></li>
               <li className='text-xl'><b>BlogNest</b></li>
            </div>
            <div className='flex gap-4 text-lg'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/addblog">Add Blogs</Link></li> 
            </div>
        </ul>
    </div></div>
  )
}
export default NavBar;
