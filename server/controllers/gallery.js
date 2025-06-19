import Gallery from "../models/Gallery.js";
import User from "../models/User.js";

export class GalleryController {
    // the method to add the images on gallery section
    async addGallery(req, res) {
            const { title, image, description } = req.body;
            try {
                const userid = req.user;
                const isUser = await User.findById(userid);
                if (!isUser || isUser.role !== 'Admin') {
                    return res.status(400).json({
                        message: "You are not authorized to add a photo to the gallery"
                    });
                }

                const imagePaths = req.files.map(file => file.path);

                const newGallery = new Gallery({
                    title,
                    image: imagePaths,
                    description
                });

                await newGallery.save();

                res.status(200).json({
                    message: "Gallery Added Successfully"
                });

            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message: "Error Occurred"
                });
            }
        }
        // the method which to get all the gallery images;
    async getGallery(req, res) {

            try {
                const gallery = await Gallery.find();
                res.status(200).json(gallery);
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message: "Error Occurred"
                });
            }
        }
        // the method which is used to delete the gallery
    async deleteGallery(req, res) {
        const id = req.params.id;
        const userid = req.user;

        try {
            const user = await User.findById(userid);

            if (!user || user.role !== 'Admin') {
                return res.status(400).json({
                    message: "You are not authorized to delete this"
                });
            }

            const gallery = await Gallery.findByIdAndDelete(id);

            if (!gallery) {
                return res.status(400).json({
                    message: "Gallery not found"
                });
            }

            res.status(200).json({
                message: "Gallery deleted successfully"
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error occurred"
            });
        }
    }

}