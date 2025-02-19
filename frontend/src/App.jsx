import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './Components/Home';
import { Blogs } from './Components/Blogs';
import { AddBlog } from './Components/AddBlog';
import BlogModal from './Components/BlogModal';
import EditBlogModal from './Components/EditBlogModal';
function App() {
  
  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/blogs' element = {<Blogs/>} />
      <Route path='/addblog' element = {<AddBlog/>}/>
      <Route path='/blogdmodal' element ={<BlogModal/>}/> 
      <Route path='/editblogmodal' element ={<EditBlogModal/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;
