import mongoose from "mongoose";
import User from '../models/User.js';
const registeredSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    BusinessName: {
        type: String,
        required: true,
    },
    RegistrationNumber: {
        type: String,
        required: true,
    },
    PhysicalAddress: {
        type: String,
        required: true,
    },
    BusinessPhone: {
        type: String,
        required: true,
        length: 12,
    },
    BusinessEmail: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false, // Optional
    },
    OwnerFullName: {
        type: String,
        required: true,
    },
    OwnerPhone: {
        type: String,
        required: true,
    },
    OwnerEmail: {
        type: String,
        required: true,
    },

    verificationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
}, {
    timestamps: true, // adds createdAt & updatedAt
});

const RegisteredBusiness = mongoose.model("RegisteredBusiness", registeredSchema);

export default RegisteredBusiness;