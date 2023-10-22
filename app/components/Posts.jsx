import React from 'react'
import BlogList from './BlogList';
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client';

const query=groq`
*[_type=="post"]{
    ...,
    author->,
    description,
    categories[]->,    
}| order(_createdAt desc) 
`;

const posts=await client.fetch(query)

function Posts() {
  // {console.log(posts.length)}
  return (
    <BlogList posts={posts}/>
  )
}

export default Posts