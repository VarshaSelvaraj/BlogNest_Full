import React from 'react'
import NavBar from './NavBar';

const Home = () => {
  return (
    <>
        <NavBar/>
        <div className='bg-[url(https://blog.designfiles.co/wp-content/uploads/2024/06/rendering-software.jpeg)] bg-scroll bg-no-repeat bg-cover py-100 px-30 justify-items-start '>
        <div className="bg-white/30 backdrop-blur-none">
            <h1 className='text-4xl pb-10 font-bold'>"Share what excites you—your blog, your story, your way"</h1>
            <h1 className='text-2xl font-medium'>Easily craft your blogs here..</h1>
            </div>
        </div>
       
    </>
    
  )
}
export default Home;
