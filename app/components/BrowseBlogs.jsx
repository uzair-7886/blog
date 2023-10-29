'use client'
import React from 'react'
import { useContext,useEffect,useState } from 'react'
import { ModeContext } from '../context/mode.context'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client';
import BlogList from './BlogList'

function BrowseBlogs({children}) {
    const [posts,setPosts]=useState([])
    const [category,setCategory]=useState("Money")
    




    const { state, dispatch, changeMode } = useContext(ModeContext);
    const { mode } = state;

    const query=mode=='latest'?groq`
*[_type=="post"]{
    ...,
    author->,
    description,
    categories[]->,    
} | order(_createdAt desc)
`
:
groq`
*[_type=="post" && $category in categories[]->title]{
    ...,
    author->,
    description,
    categories[]->,    
} | order(_createdAt desc)
`


    useEffect(() => {
        const fetchData = async () => {
          const result = await client.fetch(query,{category});
          setPosts(result)
        };
        fetchData();
    },[mode,category])
  return (
    <>
    <hr className=" border-yellow-400 dark:border-purple-400"></hr>
    <div className='my-5  flex flex-row space-x-2 md:space-x-5 px-5 md:px-10 p-2 '>
        <div
        onClick={()=>changeMode("latest")}
        className='cursor-pointer'
        >
            <h1 className={`text-lg md:text-xl ${mode=="latest"?'text-yellow-400 dark:text-purple-400 ':'text-gray-400' } font-semibold`} >
                Latest Articles
            </h1>
        </div>
        <div
        onClick={()=>changeMode("categories")}
        className='cursor-pointer'
        >
            <h1
            className={`text-lg md:text-xl ${mode=="categories"?'text-yellow-400 dark:text-purple-400 ':'text-gray-400' } font-semibold`}
            >
                Browse Categories
            </h1>
        </div>
    </div>
    <BlogList posts={posts}/>
    </>
  )
}

export default BrowseBlogs