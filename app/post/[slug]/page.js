import { groq } from "next-sanity"
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import RichText from "@/app/components/RichText";
import Footer from "@/app/components/Footer";




export const revalidate=30


export async function generateStaticParams(){
    const query=groq`
    *[_type=="post"]{
        slug,
    }`;
    const posts=await client.fetch(query);
    return posts.map((post)=>({
        params:{
            slug:post.slug.current,
        },
    }));
}




export default async function Post(
  { params: { slug } }
) {


  const query = groq`
*[_type=='post' && slug.current== $slug] [0]
{
  ...,
author->,
categories []->
}
`

  const post = await client.fetch(query, { slug })

  return (
    <>
    {/* <Header/> */}
    
    <article className="p-5 md:p-10 pb-28 post">
      <section className="space-y-2 border-0 border-yellow-400 dark:bg-purple-400">
        <div className="relative min-h-56 flex flex-col md:flex-row
  justify-between ">
          <div className="absolute top-0 w-full h-full opacity-20 blur-sm
  ">
            <Image
              className="object-cover object-center mx-auto"
              src={urlForImage(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>
          <section className="p-5 w-full bg-yellow-400  dark:bg-purple-400">
            <div className="flex flex-col md:flex-row justify-between
gap-y-5">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center space-x-2 ">
                <Image
                  className=" rounded-full"
                  src={urlForImage(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                />
                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <div>
                    {/* author bio here */}
                  </div>
                </div>
              </div>

            </div>
            <div>
              <h2 className="italic pt-5 md:pt-10">
                {post.description}
              </h2>



              <div className="flex items-center justify-end mt-auto
space-x-2">
                {post.categories.map((category) => (
                  <div
                    key={category._id}
                    className="bg-gray-800 text-white px-4 py-1 flex justify-center items-center
rounded-full text-sm font-semibold mt-4 md:text-base">
                    {category.title}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="dark:text-gray-100 text-gray-900">

      <PortableText
      value={post.body}
      components={RichText}
      />
      </section>
    </article>
    <hr className="mb-5 md:mb-10 border-yellow-400 dark:border-purple-400 "></hr>
    <Footer/>
    </>
  )
}