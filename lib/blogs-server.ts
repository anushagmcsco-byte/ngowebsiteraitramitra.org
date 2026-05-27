import fs from "fs";
import path from "path";
import { BlogPost, defaultBlogs } from "./blogs";

// Place path inside writable local directory mapping
const filePath = path.join(process.cwd(), "lib", "blogs-data.json");

export function getBlogsFromServer(): BlogPost[] {
  try {
    if (!fs.existsSync(filePath)) {
      // Initialize with default seed data
      fs.writeFileSync(filePath, JSON.stringify(defaultBlogs, null, 2), "utf-8");
      return defaultBlogs;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading blogs database file, using defaults:", error);
    return defaultBlogs;
  }
}

export function saveBlogsToServer(blogs: BlogPost[]): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error keeping blogs synced to file system:", error);
    return false;
  }
}
