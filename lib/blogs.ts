// Shared types and preloaded data for the blog engine
import soilImg from "../src/assets/images/soil_workshop_1779872711266.png";
import eduImg from "../src/assets/images/rural_digital_education_1779872087959.png";
import womenImg from "../src/assets/images/women_empowerment_1779872106993.png";
import waterImg from "../src/assets/images/water_dam_1779872733604.png";
import heroImg from "../src/assets/images/karnataka_farmer_hero_1779872061305.png";

export interface BlogPost {
  id: string;
  title: string;
  category: "Agriculture" | "Education" | "Women Empowerment" | "Health" | "Environment" | "Livelihood";
  author: string;
  date: string;
  readTime: string;
  coverImage: "soil" | "water" | "hero" | "edu" | "women" | string;
  summary: string;
  content: string;
}

export const defaultBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "Revitalizing Agrarian Soils: Organic Livelihoods in Hubballi Secondary Sectors",
    category: "Agriculture",
    author: "Dr. Sangamesh M. (Soil Specialist)",
    date: "2026-05-15",
    readTime: "5 min read",
    coverImage: "soil",
    summary: "How Raita Mitra Social Trust is helping marginal farmers rejuvenate dry cropland through composting, bio-fertilizers, and water-recharge campaigns.",
    content: `### Cultivating Resilient Soil Profiles in Karnataka

Dry and declining agricultural yields present severe challenges across Northern Karnataka. Heavy dependency on synthetic chemicals over preceding generations has depleted the organic humus profile, compacting the soil and making fields vulnerable to severe dry spells. At **Raita Mitra Social Trust**, our agricultural focus works hand-in-hand with scientists to empower marginal crop growers.

#### Active Soil-Building Pillars:

1. **Jiwamrita Bio-Inoculants**: Supplying hands-on training to manufacture microbial culture containers locally on fields.
2. **Organic Compost Management**: Showing farmers how to repurpose crop residuos into carbon-rich topsoil enhancers.
3. **Alternation Nitrogen Sequencing**: Direct and practical coaching to sequence leguminous pulses alongside robust high-yield grains.

Through the Dharwad and Hubballi advisory campaigns, participating smallholder farmers have successfully reduced synthetic input bills by 35% on average while securing resilient yields under monsoon delays. Diagnostic testing cards are continuously supplied to identify mineral gaps.`
  },
  {
    id: "blog-2",
    title: "Bridging Digital Divides: AI and Modern Coding in Rural Public Schools",
    category: "Education",
    author: "Meera Naik (Empowerment Director)",
    date: "2026-04-28",
    readTime: "6 min read",
    coverImage: "edu",
    summary: "Setting up computer science platforms, AI awareness, and productivity tools workshops for public state schools in Belagavi.",
    content: `### Digital Skills as the Ultimate Social Leveler

Young rural minds possess massive creative promise, but lack computational access. To bridge this structural gap, Raita Mitra Social Trust launched its mobile **Digital & AI Skill Development Booths**.

Our custom-tailored computer courses move far beyond typing drills to foster genuine creative logic:

* **Visual Coding Modules**: Teaching kids Scratch logic to create interactive crop weather stories.
* **General AI Awareness**: Explaining large language models and smart agricultural apps.
* **Modern Productivity Basics**: Familiarizing youth with workspace tools like spreadsheets, docs, and direct emails.

By deploying mobile workstation clusters to Belagavi schools, we omit high transit barriers so that bright young students enjoy cutting-edge computer tools completely free. Over 180 pupils are registered in our active training batches.`
  },
  {
    id: "blog-3",
    title: "Empowering Rural Matriarchs: Fostering Sustainable Self-Help Groups (SHGs)",
    category: "Women Empowerment",
    author: "Shilpa Patil (Trustee)",
    date: "2026-05-10",
    readTime: "4 min read",
    coverImage: "women",
    summary: "Guiding women collectives through financial ledger systems, craft micro-enterprises, and direct marketing linkages in Haveri.",
    content: `### Structural Financial Autonomy in Villages

Rural economic resilience requires women to participate as equal partners in financial decisions. Through Raita Mitra Social Trust's regional coordination, we are proud to support **12 active Self-Help Groups (SHGs)** across Haveri and Koppal districts.

#### Our Empowerment Lifecycle:

1. **Ledger Auditing Systems**: Training leaders to maintain transparent savings records and coordinate fair interest models.
2. **Vocational Craft Units**: Workshops providing tools to manufacture hand-packaged organic items and traditional handloom fabrics.
3. **Middlemen Reduction**: Establishing cooperative hubs that coordinate sales directly with buyers at county markets, securing higher profits.

These sustainable micro-enterprises ensure direct, continuous household income. Rural mothers can now invest in their children's secondary schooling, health requirements, and resilient farming seeds.`
  }
];

export const getCoverImageAsset = (key: string) => {
  switch (key) {
    case "soil":
      return soilImg;
    case "water":
      return waterImg;
    case "edu":
      return eduImg;
    case "women":
      return womenImg;
    default:
      return heroImg;
  }
};
