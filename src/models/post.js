import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { collection: 'posts' });

export default mongoose.model('Post', postSchema);