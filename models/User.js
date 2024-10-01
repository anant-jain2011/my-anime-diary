const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, reuired: true },
    given_name: { type: String, reuired: true },
    email: { type: String, reuired: true },
    picture: { type: String, reuired: true },
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model("User", UserSchema);