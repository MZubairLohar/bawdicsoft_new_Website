import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a Buffer to Cloudinary and returns the secure URL.
 * Used by API routes that receive an image as multipart/form-data.
 */
export function uploadBufferToCloudinary(
  buffer: Buffer,
  options: { folder?: string; public_id?: string } = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder ?? 'bawdicsoft-blogs',
        public_id: options.public_id,
        resource_type: 'image',
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary upload returned no result'));
          return;
        }
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

export default cloudinary;
