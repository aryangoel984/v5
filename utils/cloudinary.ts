// utils/cloudinary.ts
const cloudinary = require('next-cloudinary');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Generates a signature for signed uploads.
 * @returns {Object} An object containing the signature and timestamp
 */
export const generateSignature = (): { signature: string; timestamp: number } => {
  const timestamp = Math.round((new Date()).getTime() / 1000); // Current timestamp
  const params = {
    timestamp,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, // Use the preset from .env
  };

  // Generate the signature
  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);
  
  return { signature, timestamp };
};
