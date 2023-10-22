import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

const RichText = {
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full md:h-96 h-60 md:m-10 mx-auto">
          <Image
            className=" object-contain"
            src={urlForImage(value).url()}
            alt="Blog Post Image"
            fill
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    ),
  },
  block: {
    // p:({children})=>(<p className="bg-red-500">{children}</p>),
    h1: ({ children }) => (
      <h1 className="text-5xl py-10 font-bold text-yellow-400">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-4xl py-10 font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-3xl py-10 font-bold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-2xl py-10 font-bold">{children}</h4>
    ),
    

    blockquote: ({ children }) => (
      <blockquote className="border border-l-yellow-400 border-l-8 pl-5 py-5 my-5 bg-gray-200 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          className="underline decoration-yellow-400 hover:decoration-black text-yellow-400 "
        >
          {children}
        </Link>
      );
    },
  },
};

export default RichText;
