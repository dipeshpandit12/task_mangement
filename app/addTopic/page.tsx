"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit=async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!title || !description){
            alert("Title and Description are required");
            return;
        }
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, description}),
            });
            if(res.ok){
                router.push("/");
            }else{
                throw new Error("Failed to add topic");
            }
            return await res.json();
            }catch(error){
                console.log(error);
            }
    }

    return (
    <>
        <form onSubmit={handleSubmit} className="flex flex-col items-column mx-3 my-3 space-y-3" >
            <input className="bg-gray-800 p-2 rounded-md" type="text" placeholder="Topic Title" onChange={(e)=>setTitle(e.target.value)} />
            <input className="bg-gray-800 p-2 rounded-md" type="text" placeholder="Topic Description" onChange={(e)=>setDescription(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md " type="submit" >Add Topic</button>
        </form>
    </>
    );
}