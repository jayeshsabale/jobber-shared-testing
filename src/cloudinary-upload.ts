import {
  v2 as CloudinaryType,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

function ensureCloudinaryConfig(cloudinaryInstance: typeof CloudinaryType) {
  const { cloud_name, api_key, api_secret } = cloudinaryInstance.config();
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Cloudinary not configured: Missing cloud_name, api_key, or api_secret. " +
        "Make sure to call config.cloudinaryConfig() in your service startup."
    );
  }
}

/**
 * Upload an image or any file to Cloudinary.
 */
export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean,
  cloudinaryInstance: typeof CloudinaryType = require("cloudinary").v2
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  // ✅ Guard against missing config
  ensureCloudinaryConfig(cloudinaryInstance);

  return new Promise((resolve, reject) => {
    cloudinaryInstance.uploader.upload(
      file,
      { public_id, overwrite, invalidate, resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
}

/**
 * Upload a video to Cloudinary.
 */
export function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean,
  cloudinaryInstance: typeof CloudinaryType = require("cloudinary").v2
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  // ✅ Guard against missing config
  ensureCloudinaryConfig(cloudinaryInstance);

  return new Promise((resolve, reject) => {
    cloudinaryInstance.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        chunk_size: 50000,
        resource_type: "video",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
}
