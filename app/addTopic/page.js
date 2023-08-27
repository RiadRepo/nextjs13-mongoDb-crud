"use client"

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from the correct package

export default function Page() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }), // Use title and description variables
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
      <input
        className='border border-slate-500 px-8 py-2 mt-2'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type='text'
        placeholder='Topic title'
      />
      <input
        className='border border-slate-500 px-8 py-2'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type='text'
        placeholder='Topic Description'
      />
      <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit' type='submit'>
        Add Topic
      </button>
    </form>
  );
}
