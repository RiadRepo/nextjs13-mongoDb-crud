import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topics";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json(); // Await the request.json() promise

    const { title, description } = data;

    await connectMongoDB();
    await Topic.create({
      title,
      description,
    });

    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create topic" }, { status: 400 });
  }
}


export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find()
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log("Received DELETE request for id:", id);

    await connectMongoDB();
    await Topic.findByIdAndDelete(id);

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete topic" }, { status: 400 });
  }
}
