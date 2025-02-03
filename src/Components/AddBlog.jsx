
import { use } from 'react';
import { useState } from 'react';

export const AddBlog = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [img, setImg] = useState();
    console.log(title,"hi");
    return (
        <>
    
                <div className='flex w-screen justify-center items-center'>
                
                    <div>
                    <h1 className='justify-center'>Write your blog here!</h1>
                        <form id='add-blog' className='  flex flex-col'>
                            <input type='text' 
                            value={title}
                            id='title' 
                            className='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' 
                            placeholder='Your blog title..'
                            onChange={(e)=>setTitle(e.target.value)} />
                            <textarea id='description' 
                            value={description}
                            placeholder='Your blog description..' 
                            className='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                            onChange={(e)=>setDescription(e.target.value)}>
                            </textarea>
                            <input 
                            id='imgurl' 
                            value={img}
                            className='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                            placeholder='Your blog image..' 
                            onChange={(e)=>setImg(e.target.value)}/>
                            <button type='submit' className='"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Add Blog</button>
                        </form>
                    </div>
                    <div>
                        <img src='https://th.bing.com/th/id/OIP.tdaB-JyuIL6wOYwKNMfCXAHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7' />
                    </div>
                </div>
                

        </>
    )
}
