import connectDB from "@/middleware/mongoose";
import User from "@/models/User";

export async function POST(request) {
    const data = await request.json();

    await connectDB();

    let newUser = await new User(data);
    newUser.save();

    return new Response({ "userId": newUser._id });
}