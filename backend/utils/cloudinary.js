import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: "RoomSync"
        })
        fs.unlinkSync(localFilePath);
        // // console.log("File uploaded succesfully", response.url);
        return response;
    } catch (error) {
        // console.error(error);
        fs.unlinkSync(localFilePath)    // Remove the locally saved temporary file as the upload operation got failed.
        return null;
    }

}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function (error, result) { // console.log(result); });

export { uploadOnCloudinary };