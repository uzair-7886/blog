import React from 'react'
import BlogList from './components/BlogList';
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client';
import Header from './components/Header';

export const revalidate=30
const query=groq`
*[_type=="post"]{
    ...,
    author->,
    description,
    categories[]->,    
} | order(_createdAt desc)
`;



async function Posts() {
  const posts=await client.fetch(query)
  return (
    <>
    <Header/>
    <BlogList posts={posts}/>
    </>
  )
}

export default Posts