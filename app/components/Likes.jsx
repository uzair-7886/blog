'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/client";




function Likes({ slug,id }) {
    const [likes, setLikes] = useState(undefined);
    const [localLikes, setLocalLikes] = useState(0); // Local state for likes
  
    const likesQuery = groq`
      *[_type == 'post' && slug.current == $slug] [0] {
        likes
      }
    `;

    const updateLikesQuery=groq`
    *[_type == 'post' && slug.current == $slug] [0] {
        likes->{
            _id,
            _type,
            _createdAt,
            _updatedAt,
            likes
        }
        }
    `
  
    const getLikes = async () => {
      const like = await client.fetch(likesQuery, { slug });
      setLikes(like);
    //   setLocalLikes(like);
    };
  
    const handleLikeClick = () => {
      setLocalLikes((prevLikes) => prevLikes + 1);
    //   console.log("liked")
    };
  
    useEffect(() => {
      getLikes();
    }, [likes]);
  
    useEffect(() => {
      // This is where you can handle sending the update to the backend.
      // For simplicity, let's assume you send an update every 5 seconds.
      const updateBackend = setInterval(() => {
        // Check if localLikes is greater than 0 before sending an update
        if (localLikes > 0) {
          // Send update to the backend
          console.log(`Sending ${localLikes} to the backend`);
          console.log(id)
            client
                .patch(id)
                .set({  likes: likes.likes + localLikes })
                .commit()
                .then((updatedPost) => {
                console.log(`Updated post to ${updatedPost.likes}`);
                setLocalLikes(0);
                })
                .catch((err) => {
                console.error(`Error updating post: ${err.message}`);
                });
        }
      }, 5000); // Adjust the interval as needed
  
      return () => clearInterval(updateBackend); // Cleanup interval on component unmount
    }, [localLikes]);
  
    return (
      likes && (
        <div
          className='flex justify-center items-center space-x-1 sticky bottom-2 right-2 w-[80px] bg-red-500 opacity-90 my-3 mx-1 p-5 rounded-full cursor-pointer select-none'
          onClick={handleLikeClick}
        >
          <div>{likes.likes + localLikes}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
          </svg>
        </div>
      )
    );
  }
  
export default Likes;
  