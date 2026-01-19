import { writeFileSync, mkdirSync, unlinkSync, existsSync } from "fs";
import { resolve } from "path";

const IMAGES_DIR = resolve(process.cwd(), "public/images");

export async function handleImageUpload(
  formData: FormData
): Promise<string | null> {
  const file = formData.get("image") as File;

  if (!file || file.size === 0) {
    return null;
  }

  // Ensure directory exists
  mkdirSync(IMAGES_DIR, { recursive: true });

  // Generate filename
  const timestamp = Date.now();
  const originalName = file.name.replace(/[^a-z0-9.-]/gi, "_");
  const filename = `${timestamp}_${originalName}`;
  const filepath = resolve(IMAGES_DIR, filename);

  // Write file
  const buffer = await file.arrayBuffer();
  writeFileSync(filepath, Buffer.from(buffer));

  // Return public path
  return `/images/${filename}`;
}

export function deleteImage(imagePath: string): boolean {
  if (!imagePath || !imagePath.startsWith("/images/")) {
    return false;
  }

  const filename = imagePath.split("/").pop();
  if (!filename) return false;

  const filepath = resolve(IMAGES_DIR, filename);

  try {
    if (existsSync(filepath)) {
      unlinkSync(filepath);
      return true;
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }

  return false;
}
