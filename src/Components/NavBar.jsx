import React from 'react';
import { Link } from 'react-router-dom';
import { MessagesSquare } from 'lucide-react';

const NavBar = () => {
  return (
    <div>
      <ul className="fixed top-0 w-full bg-transparent  p-4 flex gap-20 z-50">
        <div className='flex gap-2 text-lg'>
          <li><MessagesSquare/></li>
          <li className='text-2xl'><b>BlogNest</b></li>
        </div>
      </ul>
    </div>
  );
};

export default NavBar;
