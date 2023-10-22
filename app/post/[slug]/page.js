import { groq } from "next-sanity"
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Header from "@/app/components/Header";
import PortableText from "react-portable-text";

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
    <article className="p-5 md:p-10 pb-28 ">
      <section className="space-y-2 border border-yellow-400 ">
        <div className="relative min-h-56 flex flex-col md:flex-row
  justify-between">
          <div className="absolute top-0 w-full h-full opacity-20 blur-sm
  ">
            <Image
              className="object-cover object-center mx-auto"
              src={urlForImage(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>
          <section className="p-5 w-full bg-yellow-400">
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
                  <p
                    key={category._id}
                    className="bg-gray-800 text-white px-3 py-1
rounded-full text-sm font-semibold mt-4">
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <PortableText
      content={post.body}
      projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
      dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      />
    </article>
  )
}