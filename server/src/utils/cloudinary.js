import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Set from environment variables (or fallback)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwsxhngaa',
  api_key: process.env.CLOUDINARY_API_KEY || '392169332746536',
  api_secret: process.env.CLOUDINARY_API_SECRET || '9QByIqNrwHe20b5TpVwGU7OittM',
});

// Setup storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hyperhive_notes',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export { cloudinary, storage };

