import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImage=async(fileBuffer)=>{

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'reneson' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });

}

export {uploadImage}