import {
  v2 as CloudinaryType,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

/**
 * Upload an image or any file to Cloudinary.
 * Defaults to the globally configured Cloudinary instance.
 */
export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean,
  cloudinaryInstance: typeof CloudinaryType = require("cloudinary").v2 // default instance
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinaryInstance.uploader.upload(
      file,
      { public_id, overwrite, invalidate, resource_type: "auto" },
      (error, result) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}

/**
 * Upload a video to Cloudinary.
 * Defaults to the globally configured Cloudinary instance.
 */
export function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean,
  cloudinaryInstance: typeof CloudinaryType = require("cloudinary").v2 // default instance
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
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
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}
