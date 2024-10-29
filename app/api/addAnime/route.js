import connectDB from "@/middleware/mongoose";
import User from "@/models/User";

export async function POST(request) {
    const data = await request.json();

    await connectDB();

    let apnaUser = await new User.findOne({ "email": data.email });
    apnaUser.animes = [...apnaUser.animes, data.anime];
    
    apnaUser.save();

    return Response.json({ "result": "success" });
}