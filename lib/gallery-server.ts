import fs from "fs";
import path from "path";
import { GalleryItem, defaultGallery } from "./gallery";

// Path inside writable local directory mapping
const filePath = path.join(process.cwd(), "lib", "gallery-data.json");

export function getGalleryFromServer(): GalleryItem[] {
  try {
    if (!fs.existsSync(filePath)) {
      // Initialize with default seed data
      fs.writeFileSync(filePath, JSON.stringify(defaultGallery, null, 2), "utf-8");
      return defaultGallery;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading gallery database file, using defaults:", error);
    return defaultGallery;
  }
}

export function saveGalleryToServer(gallery: GalleryItem[]): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(gallery, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error keeping gallery synced to file system:", error);
    return false;
  }
}
