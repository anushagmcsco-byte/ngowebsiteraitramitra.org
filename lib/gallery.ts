import soilImg from "../src/assets/images/soil_workshop_1779872711266.png";
import eduImg from "../src/assets/images/rural_digital_education_1779872087959.png";
import womenImg from "../src/assets/images/women_empowerment_1779872106993.png";
import waterImg from "../src/assets/images/water_dam_1779872733604.png";
import heroImg from "../src/assets/images/karnataka_farmer_hero_1779872061305.png";

export interface GalleryItem {
  id: string;
  title: string;
  category: "agriculture" | "education" | "women" | "environment";
  description: string;
  image: string; // can be "soil", "edu", "women", "water", "hero", any URL or base64 data-URI
  location: string;
  type?: "image" | "video";
  videoUrl?: string; // If it's a video, the video URL or base64 video string
}

export const defaultGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Organic Yield & Soil Conditioning Workshop",
    category: "agriculture",
    description: "Empowering Dharwad smallholders with microbial soil-cards, bio-fertilizers, and high-yield organic techniques.",
    image: "soil",
    location: "Hubballi Rural, Dharwad",
    type: "image"
  },
  {
    id: "gal-2",
    title: "Primary Digital & Computer Science Lab",
    category: "education",
    description: "Rural public school youth logging onto computational modules, basic tech skills, and digital tools.",
    image: "edu",
    location: "Belagavi District",
    type: "image"
  },
  {
    id: "gal-3",
    title: "Women Microenterprise Cooperative Training",
    category: "women",
    description: "Developing vocational skills, local handicrafts, and ledger-keeping savings for Self-Help Groups (SHGs).",
    image: "women",
    location: "Haveri Region",
    type: "image"
  },
  {
    id: "gal-4",
    title: "Community Rainwater Harvesting Dam",
    category: "environment",
    description: "Groundwater recharge dams built near drier farming sub-sectors to preserve high-yield crops under monsoon delays.",
    image: "water",
    location: "Koppal District",
    type: "image"
  },
  {
    id: "gal-5",
    title: "Climate Resilient Crop Diagnostics",
    category: "agriculture",
    description: "Marginal farmers checking leaf-tissue quality under organic advisory campaigns in Hubballi.",
    image: "hero",
    location: "HBL Suburbs, Karnataka",
    type: "image"
  },
  {
    id: "gal-6",
    title: "Welfare Campaign Highlights Video",
    category: "agriculture",
    description: "Overview of direct benefit transfer and organic advisory campaigns run across rural Karnataka.",
    image: "hero",
    location: "Dharwad Region",
    type: "video",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "gal-7",
    title: "Rural Computer Lab Digital Training",
    category: "education",
    description: "Interactive session demonstration of local youth learning web fundamentals in the community-sponsored digital learning hubs.",
    image: "edu",
    location: "Hubballi Office Lab",
    type: "video",
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  }
];

export const getGalleryImage = (imageKey: string): any => {
  if (!imageKey) return heroImg;
  switch (imageKey) {
    case "soil":
      return soilImg;
    case "edu":
      return eduImg;
    case "women":
      return womenImg;
    case "water":
      return waterImg;
    case "hero":
      return heroImg;
    default:
      // If it is a web URL or base64 data URL, return it directly
      return imageKey;
  }
};
