import React from "react";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import ClientSideRoute from "./ClientSideRoute";

function BlogList({ posts }) {
  return (
    <div>
      
      
      <div className="scroll-smooth focus:scroll-auto min-h-[30em] grid grid-cols-1 md:grid-cols-2 md:px-10 px-5 gap-10 md:gap-y-16 pb-24 gap-y-10">

      
      {posts.map((post) => (
        <ClientSideRoute
        key={post._id}
        route={`/post/${post.slug.current}`}
        >
        <div
          
          className="flex flex-col group
cursor-pointer"
        >
          <div
            className="relative w-full md:h-64 h-48 drop-shadow-xl
group-hover:scale-105 transition-transform duration-200
ease-out"
          >
            <Image
              className="object-cover object-center bg-gray-200"
              src={urlForImage(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
            <div
              className="absolute bottom-0 w-full bg-opacity-20
Obg-black backdrop-blur-lg rounded drop-shadow-lg text-white
p-3 flex justify-between"
            >
              <div>
                <p className="font-bold text-lg md:text-xl">{post.title}</p>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div
                className="flex flex-col md:flex-row gap-y-2
md: gap-x-2 items-center"
              >
                {post.categories.map((category) => (
                  <div
                    className="bg-yellow-400 text-center text-black
px-3 py-1 rounded-full text-sm font-semibold dark:bg-purple-400"
                  >
                    <p>{category.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex-1">
<p className="underline text-lg font-bold">{post.title}</p>
<p className="text-gray-500 line-clamp-2">{post.description}</p>
{/* {console.log(post)} */}
</div>
<div className="flex justify-start items-center space-x-2">
<p className="text-yellow-400 dark:text-purple-400 font-bold text-lg md:text-xl group-hover:underline ">
  Read Post
</p>
<div className=" text-yellow-400 dark:text-purple-400"  >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
</svg>


          </div>
</div>
        </div>
        </ClientSideRoute>
      ))}
      </div>
      
    </div>
  );
}

export default BlogList;
