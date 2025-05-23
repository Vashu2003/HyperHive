import { v2 as cloudinary } from 'cloudinary';

// Config from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwsxhngaa',
  api_key: process.env.CLOUDINARY_API_KEY || '392169332746536',
  api_secret: process.env.CLOUDINARY_API_SECRET || '9QByIqNrwHe20b5TpVwGU7OittM',
});

// Delete file by public_id and resourceType (required)
export const deleteFromCloudinary = async (publicId, resourceType) => {
  if (!resourceType) {
    throw new Error('Resource type is required for Cloudinary deletion');
  }
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return result;
  } catch (error) {
    throw new Error('Cloudinary deletion failed: ' + error.message);
  }
};

export { cloudinary };
