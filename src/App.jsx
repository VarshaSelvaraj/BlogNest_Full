import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './Components/Home';
import { Blogs } from './Components/Blogs';
import { AddBlog } from './Components/AddBlog';
 


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element = {<Home/>} />
      <Route path='/blogs' element = {<Blogs/>} />
      <Route path='/addblog' element = {<AddBlog/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;
