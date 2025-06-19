import mongoose from "mongoose";
const heroBannerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: [String],
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true
});

const HeroBanner = mongoose.model('HeroBanner', heroBannerSchema);
export default HeroBanner;