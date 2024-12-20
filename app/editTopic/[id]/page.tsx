import EditTopicForm from "@/components/EditTopicForm";

const getTopicById=async(id:string)=>{
    try{
        const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/${id}`, {cache:"no-store"});
        if(!res.ok) throw new Error("Failed to fetch topic");
        const data= res.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

export default async function EditTopic({params}:{params:{id:string}}) {
    const {id}=params;
    const {topic}=await getTopicById(id);
    const {title, description}=topic;
    return <EditTopicForm id={id} title={title} description={description}/>
}