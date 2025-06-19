import mongoose from 'mongoose';
const gallerySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    description: {
        type: String
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});
const gallery = mongoose.model('gallery', gallerySchema);

export default gallery;