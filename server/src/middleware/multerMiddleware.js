import multer from 'multer'

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 30 * 1024 * 1024 }, // 30MB limit for optimization
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error("only image allowed"), false);
        }
    }
});

export { upload };