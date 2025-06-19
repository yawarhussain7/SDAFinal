import FeedBack from '../models/FeedBack.js';
import User from '../models/User.js'
export class FeedBackController {
    // to add feedback
    async addFeedBack(req, re) {
            const { name, email, message } = req.body;
            const userid = req.user;
            try {
                const user = await User.findById(userid);
                if (!user || user.role != 'Customer' || !user.role == 'HotelManager' || !user.role != 'PackageManager') {
                    return res.status(400).json({ message: 'You are not authorized to add feedback' })
                }
                const newFeedBack = await FeedBack.create({
                    name,
                    email,
                    message,
                })
                await newFeedBack.save();
                return res.status(200).json({ message: 'Feedback added successfully' })
            } catch (err) {
                return res.status(500).json({ message: 'Error adding feedback' })

            }
        }
        // to get all the feedback
    async getAllFeedBack(req, res) {
        const userid = req.user;
        try {
            const user = await User.findById(userid);
            if (!user || user.role != 'Admin') {
                return res.status(400).json({ message: 'You are not authorized to view feedback' })
            }
            const feedback = await FeedBack.find();
            return res.status(200).json(feedback)

        } catch (err) {
            return res.status(500).json({ message: 'Error fetching feedback' })

        }
    }
}