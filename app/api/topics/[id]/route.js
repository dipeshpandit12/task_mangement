import connectToDB from "@/libs/mongodb";
import Topic from "@/modals/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { title, description } = await request.json();

    try {
        await connectToDB();
        await Topic.findByIdAndUpdate(id, { title, description });
        return NextResponse.json({ message: "Topic updated" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error updating topic" },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    const {id}= params;
    await connectToDB();
    const topic= await Topic.findOne({_id: id});
    return NextResponse.json({topic}, {status: 200});
}

export async function DELETE(request, { params }) {
    const { id } = params;
    
    try {
        await connectToDB();
        await Topic.findByIdAndDelete(id);
        return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error deleting topic" },
            { status: 500 }
        );
    }
}
