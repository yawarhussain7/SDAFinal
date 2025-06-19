import HeroBanner from '../models/HeroBanner.js';
import User from '../models/User.js';

export class HeroBannerController {
    // the method through which hero banner has been added
    async addHeroBanner(req, res) {
        const { title, description } = req.body;
        const userid = req.user;

        try {
            const user = await User.findById(userid);
            if (!user || user.role !== 'Admin') {
                return res.status(403).json({ message: 'You are not authorized to perform this action' });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'Please upload an image' });
            }

            const imagePath = req.file.path;

            const newHeroBanner = await HeroBanner.create({
                title,
                description,
                images: [imagePath]
            });

            res.status(201).json({ message: 'Hero Banner Added Successfully', newHeroBanner });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error Adding Hero Banner', error: err.message });
        }
    }

    // the method to get all the images
    async getHeroBanner(req, res) {
            try {
                const heroBanner = await HeroBanner.find();
                res.status(200).json({
                    heroBanner
                })
            } catch (err) {
                return res.status(500).json({ message: "Error fetching HeroBanner", error: err.message });

            }
        }
        // the method to delete the image
    async deleteHeroBanner(req, res) {
        const user_id = req.user;
        const id = req.params.id;
        try {
            const user = await User.findById(user_id);
            if (!user || !user.role != 'Admin') {
                res.status({
                    message: "Your not are authorized to delete this"
                })
            }
            const banner = await HeroBanner.findByIdAndDelete(id);
            if (!banner) {
                res.status(400).json({
                    message: "the Hero Banner is not found"
                })
            }
            res.status(400).json({
                message: "Successfully delete the Hero Banner"
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Error deleteing  HeroBanner", error: err.message });
        }
    }


}