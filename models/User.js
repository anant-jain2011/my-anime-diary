const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, reuired: true },
    first_name: { type: String, reuired: true },
    picture: { type: String, reuired: true },
    animes: { type: Array, required: true }
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model("User", UserSchema);