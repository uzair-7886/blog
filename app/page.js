import React from 'react'
import BlogList from './components/BlogList';
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client';
import Header from './components/Header';
import BrowseBlogs from "@/app/components/BrowseBlogs";
import Footer from './components/Footer';

export const revalidate=60
const query=groq`
*[_type=="post"]{
    ...,
    author->,
    description,
    categories[]->,    
} | order(_createdAt desc)
`;



async function Posts() {
  // const {state}=useModeContext()

  const posts=await client.fetch(query)
  return (
    <>
    <Header/>
    <BrowseBlogs/>
    <Footer/>
    </>
  )
}

export default Posts