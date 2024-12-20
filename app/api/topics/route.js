import connectToDB from "@/libs/mongodb";
import Topic from "@/modals/topic";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {title, description} = await request.json();
    await connectToDB();
    const existingTopic = await Topic.findOne({title: title});
    if(existingTopic){
        return NextResponse.json({message: "Topic already exists"}, {status: 400});
    }
    await Topic.create({title, description});
    return NextResponse.json({message: "Topic created successfully"}, {status: 201});
}

export async function GET() {
    await connectToDB();
    const topics = await Topic.find({});
    return NextResponse.json(topics, {status: 200});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectToDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: "Topic deleted successfully"}, {status: 200});
}
