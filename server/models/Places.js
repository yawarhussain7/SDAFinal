import mongoose from 'mongoose'
const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    region: { type: String, required: true },
    desc: { type: String, required: true, maxlength: 200 },
    placeDetail: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    price: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'], required: true },
    bestTime: { type: String, required: true },
    image: { type: String },
    bannerImage: { type: String },
}, {
    timestamps: true,
});
const Places = mongoose.model('Places', placeSchema);
export default Places;