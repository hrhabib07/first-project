import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';

export const sendImgToCloudinary = async (path: string, imgName: string) => {


    // Configuration
    cloudinary.config({
        cloud_name: 'dnpenjlns',
        api_key: '625216138678567',
        api_secret: config.cloudinary_secret // Click 'View Credentials' below to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            path, {
            public_id: imgName,
        }
        )
        .catch((error) => {
            console.log(error);
        });

    // console.log(uploadResult);
    const unlinkAsync = promisify(fs.unlink);
    // Delete the file like normal
    await unlinkAsync(path)

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(imgName, {
        fetch_format: 'auto',
        quality: 'auto'
    });

    // console.log(optimizeUrl);

    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url(imgName, {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });

    return optimizeUrl;
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads/")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })