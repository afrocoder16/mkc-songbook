import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, minLength: 8 },
    password: { type: String, required: true },
    name: { type: String, required: true },
    searchHistory: [
        { type: Types.ObjectId, required: true, ref: "SearchHistory" },
    ],
});
const UserModel = model("User", userSchema);

export default UserModel;
