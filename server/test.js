import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: 'dwsxhngaa',
  api_key: '392169332746536',
  api_secret: '9QByIqNrwHe20b5TpVwGU7OittM',
});

cloudinary.uploader.upload("./image.jpeg", (error, result) => {
  if (error) {
    console.error('Cloudinary upload error:', error);
  } else {
    console.log('Cloudinary upload success:', result);
  }
});
