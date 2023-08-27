"use client";

import { useRouter } from "next/navigation";

import { HiOutlineTrash } from "react-icons/hi";
// Import from "next/router" instead of "next/navigation"

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure?"); // Use window.confirm for the confirmation dialog
      if (confirmDelete) {
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          router.refresh();// Use router.replace to refresh the page
        }
      }
    } catch (error) {
      console.log("Error in RemoveBtn: ", error);
    }
  };

  return (
    <button className='text-red-400' onClick={handleSubmit}>
      <HiOutlineTrash size={24} />
    </button>
  );
}
