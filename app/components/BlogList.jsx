import React from "react";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import ClientSideRoute from "./ClientSideRoute";

function BlogList({ posts }) {
  return (
    <div>
      <hr className="mb-5 md:mb-10 border-yellow-400"></hr>
      {/* <h1>Latest Articles</h1> */}
      {/* <div>{JSON.stringify(posts)}</div> */}
      {/* Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:px-10 px-5 gap-10 md:gap-y-16 pb-24 gap-y-10">

      
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
            className="relative w-full md:h-80 h-48 drop-shadow-xl
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
px-3 py-1 rounded-full text-sm font-semibold"
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
<p className="text-yellow-400 font-bold text-lg md:text-xl group-hover:underline ">
  Read Post
</p>
        </div>
        </ClientSideRoute>
      ))}
      </div>
      
    </div>
  );
}

export default BlogList;
