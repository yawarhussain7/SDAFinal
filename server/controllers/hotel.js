import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import Company from "../models/CompanyVerfication.js";
import Room from "../models/Room.js";

export class HotelController {
    // Add a hotel
    static async addHotel(req, res) {
        const { name, location, rating } = req.body;
        let { facilities } = req.body;
        const userId = req.user;

        if (!name || !location || !rating) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const company = await Company.findOne({ User: userId });
            if (!company) {
                return res.status(400).json({ message: "Company not found, please add company first" });
            } else if (company.verificationStatus === "pending") {
                return res.status(400).json({ message: "Company verification pending, please verify company first" });
            } else if (company.verificationStatus === "rejected") {
                return res.status(400).json({ message: "Company verification rejected, please reapply for verification" });
            }
            if (typeof facilities === "string") {
                facilities = facilities.split(",");
            }

            const imagePaths = req.files ? req.files.map((file) => `uploads/${file.filename}`) : [];

            const hotel = new Hotel({
                userId,
                name,
                location,
                rating,
                facilities: facilities || [],
                images: imagePaths,
            });

            await hotel.save();

            return res.status(201).json({
                message: "Hotel added successfully",
                hotel,
            });
        } catch (error) {
            console.error("Error adding hotel:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Get all hotels with pagination for customer
    static async getAllHotel(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        try {
            const hotels = await Hotel.find().skip(skip).limit(limit);
            const total = await Hotel.countDocuments();

            return res.status(200).json({
                message: "Hotels found",
                hotels,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalHotels: total,
            });
        } catch (error) {
            console.error("Error fetching hotels:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Get hotel detail including its rooms
    static async getHotelDetail(req, res) {
        const hotelId = req.params.hotelId;

        try {
            const hotel = await Hotel.findById(hotelId);
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }

            const rooms = await Room.find({ hotelId: hotelId });

            return res.status(200).json({
                message: "Hotel detail found",
                hotel,
                rooms,
            });
        } catch (error) {
            console.error("Error fetching hotel detail:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Get all hotels for the authenticated user
    static async getHotel(req, res) {
        const userId = req.user;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const hotels = await Hotel.find({ userId });
            return res.status(200).json(hotels); // Return array directly
        } catch (error) {
            console.error("Error fetching hotels:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Get all rooms for a specific hotel
    static async getRoom(req, res) {
        const userId = req.user;
        const hotelId = req.params.hotelId;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hotel = await Hotel.findOne({ _id: hotelId, userId });
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found or not authorized" });
            }

            const rooms = await Room.find({ hotelId });
            return res.status(200).json({ rooms });
        } catch (error) {
            console.error(`Error fetching rooms for hotel ${hotelId}:`, error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Delete a hotel
    static async deleteHotel(req, res) {
        const { id } = req.params;
        const userId = req.user;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hotel = await Hotel.findOne({ _id: id, userId });
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found or not authorized" });
            }

            // Delete associated rooms
            await Room.deleteMany({ hotelId: id });
            // Delete the hotel
            await Hotel.findByIdAndDelete(id);

            return res.status(200).json({ message: "Hotel deleted successfully" });
        } catch (error) {
            console.error(`Error deleting hotel ${id}:`, error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Delete a room
    static async deleteRoom(req, res) {
        const { hotelId, roomId } = req.params;
        const userId = req.user;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hotel = await Hotel.findOne({ _id: hotelId, userId });
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found or not authorized" });
            }

            const room = await Room.findOne({ _id: roomId, hotelId });
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            await Room.findByIdAndDelete(roomId);
            return res.status(200).json({ message: "Room deleted successfully" });
        } catch (error) {
            console.error(`Error deleting room ${roomId}:`, error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Add a room to a hotel
    static async addRoom(req, res) {
        const { hotelId } = req.params;
        const { roomType, pricePerNight, numberOfGuest, numberOfBeds } = req.body;
        const userId = req.user;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hotel = await Hotel.findOne({ _id: hotelId, userId });
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found or not authorized" });
            }

            // Validate input
            if (!roomType || !pricePerNight || !numberOfGuest || !numberOfBeds) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const imagePath = req.file ? `uploads/${req.file.filename}` : "";

            const newRoom = new Room({
                hotelId,
                roomType,
                pricePerNight,
                numberOfGuest,
                numberOfBeds,
                image: imagePath,
            });

            await newRoom.save();
            return res.status(201).json({ message: "Room added successfully", room: newRoom });
        } catch (error) {
            console.error(`Error adding room to hotel ${hotelId}:`, error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}


/*


import HotelModel from '../models/Hotel.js'
import UserModel from '../models/User.js';
export class Hotel 
    // the method use to add hotels
    async addHotel(req, res) {
        const user_id = req.user;

        try {
            // 1. Check user role
            const user = await UserModel.findById(user_id);
            if (!user || user.role !== "HotelManager") {
                return res.status(401).json({ message: "You are not authorized to perform this action" });
            }

            // 2. Extract image paths
            const imagePaths = (req.files && Array.isArray(req.files)) ? req.files.map(file => file.path) : [];

            let rooms = [];

            if (req.body.rooms) {
                if (typeof req.body.rooms === "string") {
                    try {
                        rooms = JSON.parse(req.body.rooms);
                        if (!Array.isArray(rooms)) throw new Error();
                    } catch (err) {
                        return res.status(400).json({ message: "Invalid rooms format. Must be a JSON array." });
                    }
                }
            } else {
                const roomMap = {};
                for (const key in req.body) {
                    const match = key.match(/^rooms\[(\d+)\]\[(.+)\]$/);
                    if (match) {
                        const index = match[1];
                        const field = match[2];
                        if (!roomMap[index]) roomMap[index] = {};
                        roomMap[index][field] = req.body[key];
                    }
                }
                rooms = Object.values(roomMap);
            }

            let facilities = req.body.facilities || [];
            if (typeof facilities === "string") {
                facilities = [facilities]; // Single value case 
            }

            // 5. Create hotel
            const newHotel = await HotelModel.create({
                name: req.body.name,
                location: req.body.location,
                description: req.body.description || "",
                rating: req.body.rating || "0",
                manager: user_id,
                facilities,
                rooms,
                images: imagePaths,
            });

            return res.status(201).json({ message: "Hotel created successfully", hotel: newHotel });

        } catch (err) {
            console.error("Error in addHotel:", err);
            return res.status(500).json({ message: "Failed to add hotel", error: err.message });
        }
    }



    // the method use to get all hotels
    async getHotelsByRoomPrice(req, res) {
            try {
                const minPrice = Number(req.query.minPrice);
                const maxPrice = Number(req.query.maxPrice);

                const hotels = await HotelModel.find({
                    rooms: {
                        $elemMatch: {
                            pricePerNight: { $gte: minPrice, $lte: maxPrice }
                        }
                    }
                });

                return res.status(200).json({
                    message: "Hotels with rooms in the specified price range retrieved successfully",
                    hotels
                });

            } catch (err) {
                console.error("Error getting hotels by room price:", err);
                return res.status(500).json({ message: "Failed to get hotels by room price" });
            }
        }
        // the method to update the hotel price;
    async updateHotelPrice(req, res) {
            try {
                const hotelId = req.params.hotelId;
                const user_id = req.user;
                const { RoomType, newPrice } = req.body;

                // Find user and check role
                const user = await UserModel.findById(user_id);
                if (!user || user.role !== "HotelManager") {
                    return res.status(401).json({ message: "Unauthorized to update hotel price" });
                }
                const Rooms = await HotelModel.rooms.finds((roomType) => roomType == RoomType);
                if (!Rooms) {
                    return res.status(404).json({ message: "Room not found" });
                }
                const hotel = await HotelModel.findByIdAndUpdate(hotelId, {
                    $set: {
                        "rooms.$.pricePerNight": newPrice
                    }
                }, { new: true });
                await hotel.save();
                return res.status(200).json({
                    message: "Hotel price updated successfully",
                    hotel
                });


            } catch (err) {
                console.error("Error updating hotel price:", err);
                return res.status(500).json({ message: "Failed to update hotel price" });
            }
        }
        // the method to get the hotel by id;
    async getHotelById(req, res) {
            const hotelId = req.params.id;

            try {
                const hotel = await HotelModel.findById(hotelId);

                if (!hotel) {
                    return res.status(404).json({ message: "Hotel not found" });
                }

                return res.status(200).json({ message: "Hotel retrieved successfully", hotel });
            } catch (err) {
                console.error("Error getting hotel by id:", err);
                return res.status(500).json({ message: "Failed to get hotel by id" });
            }
        }
        //the method to delete the hotels
    async deleteHotel(req, res) {
        const hotelId = req.params.id;
        const userid = req.user;
        try {
            const user = await UserModel.findById(userid);
            if (!user || user.role !== "HotelManager") {
                return res.status(401).json({ message: "Unauthorized to delete hotel" });
            }
            const hotel = await HotelModel.findByIdAndDelete(hotelId);
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }
            return res.status(200).json({ message: "Hotel deleted successfully" });
        } catch (err) {
            console.error("Error deleting hotel:", err);
            return res.status(500).json({ message: "Failed to delete hotel" });
        }
    }
}
*/