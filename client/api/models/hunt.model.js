import mongoose from 'mongoose';
const { Schema } = mongoose;

const huntSchema = new Schema({
    hunt: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    profit: {
        type: Number,
        required: true,
    },
    xp: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    saved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
    {
        timestamps: true
    });

export default mongoose.model("Hunt", huntSchema)