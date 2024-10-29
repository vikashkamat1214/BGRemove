import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

const removeBgImage = async (req, res) => {
    try {
        const { clerkId } = req.body;

        // Find the user by clerkId
        const user = await userModel.findOne({ clerkId });

        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        if (user.creditBalance === 0) {
            return res.json({ success: false, message: "No Credit Balance", creditBalance: user.creditBalance });
        }

        const imagePath = req.file.path;

        // Read the image file
        const imageFile = fs.createReadStream(imagePath);

        // Prepare form data for the API request
        const formData = new FormData();
        formData.append('image_file', imageFile);

        // Send a request to the ClipDrop API to remove the background
        const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
            headers: {
                ...formData.getHeaders(),
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: 'arraybuffer'
        });

        // Convert the result to base64
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        // Update user credit balance
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        res.json({ success: true, resultImage, creditBalance: user.creditBalance - 1, message: 'Background removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { removeBgImage };
