import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      // Return dynamic folder based on route path
      if (req.originalUrl && req.originalUrl.includes('api/blogs')) return 'limra/blogs';
      if (req.originalUrl && req.originalUrl.includes('api/services')) return 'limra/services';
      if (req.originalUrl && req.originalUrl.includes('api/brands')) return 'limra/brands';
      if (req.originalUrl && req.originalUrl.includes('api/projects')) return 'limra/projects';
      return 'limra/others';
    },
  },
});

export const upload = multer({ storage: storage });
export { cloudinary };
