import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    savedHunts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hunt' }],
},
{timestamps: true}
);

export default mongoose.model("User", userSchema)