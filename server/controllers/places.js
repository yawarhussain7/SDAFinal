import Places from '../models/Places.js';
import User from '../models/User.js'

export class PlaceController {
    // the controller that is used to add the place or by admin;
    async addPlace(req, res) {
        try {
            const {
                name,
                region,
                desc,
                placeDetail,
                rating,
                reviews,
                price,
                difficulty,
                bestTime,
            } = req.body;
            const userId = req.user;
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(400).json({
                    message: "User is not Found"
                })
            }
        } catch (err) {

        }



    }






}