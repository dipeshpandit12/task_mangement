"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function EditTopicForm({id, title, description}) {
    const router = useRouter();
    const [newtitle, setNewTitle] = useState(title);
    const [newdescription, setNewDescription] = useState(description);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newtitle, description: newdescription }),
            });
            if(res.ok){
                router.push("/");
                router.refresh();
            }else{
                throw new Error("Failed to update topic");
            }
    }catch(error){
        console.log(error);
    }
}

    return (
    <>
        <form onSubmit={handleSubmit} className="flex flex-col items-column mx-3 my-3 space-y-3">
            <input className="bg-gray-800 p-2 rounded-md" type="text" placeholder="Topic Title" value={newtitle} onChange={(e)=>setNewTitle(e.target.value)} />
            <input className="bg-gray-800 p-2 rounded-md" type="text" placeholder="Topic Description" value={newdescription} onChange={(e)=>setNewDescription(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md " type="submit">Update Topic</button>
        </form>
    </>
    );
}