import React from 'react'
import BlogList from './BlogList';
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client';

const query=groq`
*[_type=="post"]{
    ...,
    author->,
    categories[]->,    
} | order(_createdAt desc) 
`;

const posts=await client.fetch(query)

function Posts() {
  return (
    <BlogList query={posts}/>
  )
}

export default Posts