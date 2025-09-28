// shared/uploads.ts
import {
  v2 as CloudinaryType,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

let cloudinaryInstance: typeof CloudinaryType | null = null;

/**
 * Initialize the shared library with a configured Cloudinary instance.
 * Must be called once at service startup.
 */
export function initCloudinary(instance: typeof CloudinaryType) {
  cloudinaryInstance = instance;
}

function getCloudinary() {
  if (!cloudinaryInstance) {
    throw new Error(
      "Cloudinary not initialized! Call initCloudinary(configuredInstance) first."
    );
  }
  return cloudinaryInstance;
}

/**
 * Upload an image or any file to Cloudinary
 */
export async function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse> {
  const cloudinary = getCloudinary();

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
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
 * Upload a video to Cloudinary
 */
export async function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse> {
  const cloudinary = getCloudinary();

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
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
