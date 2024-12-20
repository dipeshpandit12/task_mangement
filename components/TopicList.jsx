import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

const getTopics = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, { cache: "no-store" });
        if (!res.ok) {
            throw new Error("Failed to fetch new topics");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return { topics: [] };
    }
}

export default async function TopicList() {
    const topics = await getTopics();

    return (
        <>
        {topics.map((topic)=>(
            <div className="flex justify-between px-4 py-4 outline outline-1 outline-white rounded-md mx-3 my-3" key={topic._id}>
            <div className="flex flex-col py-4 space-y-3">
                <h2 className="text-2xl font-bold">{topic.title}</h2>
                <p className="text-gray-500">{topic.description}</p>
            </div>
            <div className="flex flex-row items-start py-4 space-x-2 px-2">
               <RemoveBtn id={topic._id}/>
               <Link href={`/editTopic/${topic._id}`}>
                <HiPencilAlt />
               </Link>
            </div>
        </div>
        ))}
        </>
    );
}