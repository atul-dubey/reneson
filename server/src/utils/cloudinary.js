import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
import sharp from 'sharp'

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImage = async (fileBuffer) => {
    let processedBuffer = fileBuffer;

    try {
        const metadata = await sharp(fileBuffer).metadata();
        const pipeline = sharp(fileBuffer).resize({
            width: 2560,
            height: 2560,
            fit: 'inside',
            withoutEnlargement: true
        });

        if (metadata.format === 'png') {
            processedBuffer = await pipeline.png({ quality: 95, compressionLevel: 9 }).toBuffer();
        } else if (metadata.format === 'webp') {
            processedBuffer = await pipeline.webp({ quality: 95 }).toBuffer();
        } else {
            // Default to high-quality JPEG for JPG and others
            processedBuffer = await pipeline.jpeg({ quality: 95, mozjpeg: true }).toBuffer();
        }
    } catch (err) {
        console.error("Sharp optimization failed, using original fileBuffer:", err.message);
        processedBuffer = fileBuffer;
    }

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'reneson' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        streamifier.createReadStream(processedBuffer).pipe(uploadStream);
    });

}

export { uploadImage }