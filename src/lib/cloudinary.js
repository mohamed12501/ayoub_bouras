export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET

export function buildCloudinaryVideoUrl(publicId, options = '') {
  // returns a Cloudinary resource URL for the given public ID
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${options}/${publicId}`
}
