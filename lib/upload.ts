import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const URL_PATTERN = /\/(image|video|raw)\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/;

export async function deleteUploadedFile(publicUrl: string | null | undefined): Promise<void> {
  if (!publicUrl || !publicUrl.includes("res.cloudinary.com")) return;

  const match = publicUrl.match(URL_PATTERN);
  if (!match) return;

  const [, resourceType, publicId] = match;
  await cloudinary.uploader
    .destroy(publicId, { resource_type: resourceType as "image" | "video" | "raw" })
    .catch(() => {});
}
