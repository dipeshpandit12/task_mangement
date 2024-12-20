"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({id}:{id:string}) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure you want to delete this topic?");
    if (confirmed) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          router.refresh(); // Refresh the current route
        } else {
          throw new Error("Failed to delete topic");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <button className="text-red-500 mr-3" onClick={removeTopic}>
      <HiOutlineTrash />
    </button>
  );
}
