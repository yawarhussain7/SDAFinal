import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    packageType: {
        type: String,
        enum: ['Luxury', 'Family', 'Customized'],
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    travelDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, // in days
    },
    numberOfPeople: {
        type: Number,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    facilities: {
        type: [String],
    },
});

const packageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    package: [typeSchema],
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

export default Package;