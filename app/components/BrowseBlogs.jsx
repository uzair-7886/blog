'use client'
import React from 'react'
import { useContext,useEffect,useState } from 'react'
import { ModeContext } from '../context/mode.context'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client';
import BlogList from './BlogList'
import { Menu } from '@headlessui/react'

const CategoriesDropdown=({setCategory,mode})=>{
    const [categories,setCategories]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          const result = await client.fetch(groq`*[_type=="category"]{title}`)
          setCategories(result)
        };
        fetchData();
    },[])
    return(
        <Menu as="div" className="relative inline-block text-left z-20">
            <div className='flex flex-row items-center space-x-2 md:space-x-3 dark:bg-gray-800 bg-gray-100 px-3 py-1 rounded-lg'>
  <Menu.Button className={`text-md md:text-xl ${mode == "categories" ? 'text-yellow-400 dark:text-purple-400' : 'text-gray-400'} font-semibold`}>
    Browse Categories
  </Menu.Button>
  <div className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${mode == "categories" ? 'text-yellow-400 dark:text-purple-400' : 'text-gray-400'}`} >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  </div>
</div>
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                <div className="px-1 py-1 ">
                {categories.map((category) => (
                    <Menu.Item
                    >
                    {({ active }) => (
                        <div
                        onClick={()=>setCategory(category.title)}
                        className={`${
                            active ? 'dark:bg-purple-400 bg-yellow-400 dark:text-white text-black' : 'text-black dark:text-white'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                        {category.title}
                        </div>
                    )}
                    </Menu.Item>
                ))}
                </div>
            </Menu.Items>
        </Menu>
    )
    
}

function BrowseBlogs({children}) {
    const [posts, setPosts] = useState([])
    const [category, setCategory] = useState("none")
    const [isLoading, setIsLoading] = useState(true)
    
    const { state, dispatch, changeMode } = useContext(ModeContext);
    const { mode } = state;

    const query = mode === 'latest' || category === "none" 
        ? groq`
            *[_type=="post"]{
                ...,
                author->,
                description,
                categories[]->,    
            } | order(_createdAt desc)
        `
        : groq`
            *[_type=="post" && $category in categories[]->title]{
                ...,
                author->,
                description,
                categories[]->,    
            } | order(_createdAt desc)
        `

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const result = await client.fetch(query, { category });
                setPosts(result)
            } catch (error) {
                console.error("Error fetching posts:", error)
            } finally {
                setIsLoading(false)
            }
        };
        fetchData();
    }, [mode, category])

    return (
        <>
            <hr className="border-yellow-400 dark:border-purple-400"></hr>
            <div className='my-5 flex flex-row space-x-2 md:space-x-5 px-5 md:px-10 p-2'>
                <div
                    onClick={() => changeMode("latest")}
                    className='cursor-pointer'
                >
                    <h1 className={`px-2 py-1 text-md md:text-xl ${mode === "latest" ? 'text-yellow-400 dark:text-purple-400' : 'text-gray-400'} font-semibold`}>
                        Latest Articles
                    </h1>
                </div>
                <div
                    onClick={() => changeMode("categories")}
                    className='cursor-pointer'
                >
                    <CategoriesDropdown setCategory={setCategory} mode={mode}/>
                </div>
            </div>
            {mode === "categories" ?
                <div className='my-5 flex flex-row space-x-2 md:space-x-5 px-5 md:px-10 p-2'>
                    <h1 className='text-lg md:text-xl text-gray-400 font-semibold'>
                        {category === 'none' ? "Showing Results for Latest Articles" : `Showing Results for '${category}'`} 
                    </h1>
                </div>
                :
                <div className='my-5 flex flex-row space-x-2 md:space-x-5 px-5 md:px-10 p-2'>
                    <h1 className='text-lg md:text-xl text-gray-400 font-semibold'>
                        Showing Results for Latest Articles
                    </h1>
                </div>
            }
            
            <BlogList posts={posts} isLoading={isLoading}/>
        </>
    )
}


export default BrowseBlogs