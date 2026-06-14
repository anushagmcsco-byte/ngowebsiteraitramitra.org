"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Sprout,
  Users,
  GraduationCap,
  Heart,
  Leaf,
  Briefcase,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Building,
  Award,
  ArrowRight,
  X,
  CreditCard,
  Percent,
  Search,
  BookOpen,
  Info,
  Camera,
  Trash2,
  Edit,
  Plus,
  Lock,
  LogOut,
  LayoutDashboard,
  Eye,
  Play,
  Video
} from "lucide-react";

// Image imports from root /src folder
import heroImg from "../src/assets/images/karnataka_farmer_hero_1779872061305.png";
import eduImg from "../src/assets/images/rural_digital_education_1779872087959.png";
import womenImg from "../src/assets/images/women_empowerment_1779872106993.png";
import soilImg from "../src/assets/images/soil_workshop_1779872711266.png";
import waterImg from "../src/assets/images/water_dam_1779872733604.png";

import { getGalleryImage } from "@/lib/gallery";

// Types
interface FocusArea {
  id: string;
  title: string;
  emoji: string;
  icon: React.ComponentType<any>;
  impactFocus: string;
  items: string[];
  image: any;
  color: string;
}

interface ComplianceItem {
  label: string;
  value: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "agriculture" | "education" | "women" | "environment";
  description: string;
  image: any;
  location: string;
  type?: "image" | "video";
  videoUrl?: string;
}

interface BlogPost {
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

function VideoPlayer({ url }: { url: string }) {
  if (!url) return null;
  const cleanUrl = url.trim();
  
  // Extract YouTube ID if it exists
  let youtubeId = "";
  if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = cleanUrl.match(regExp);
    if (match && match[2].length === 11) {
      youtubeId = match[2];
    }
  }

  if (youtubeId) {
    return (
      <iframe
        id="home-youtube-player"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full object-cover bg-black"
      />
    );
  }

  return (
    <video
      id="home-html5-video-player"
      src={cleanUrl}
      controls
      autoPlay
      className="w-full h-full object-contain bg-black"
    />
  );
}

// Preloaded Gallery Databank
const defaultGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Organic Yield & Soil Conditioning Workshop",
    category: "agriculture",
    description: "Empowering Dharwad smallholders with microbial soil-cards, bio-fertilizers, and high-yield organic techniques.",
    image: soilImg,
    location: "Hubballi Rural, Dharwad"
  },
  {
    id: "gal-2",
    title: "Primary Digital & Computer Science Lab",
    category: "education",
    description: "Rural public school youth logging onto computational modules, basic tech skills, and digital tools.",
    image: eduImg,
    location: "Belagavi District"
  },
  {
    id: "gal-3",
    title: "Women Microenterprise Cooperative Training",
    category: "women",
    description: "Developing vocational skills, local handicrafts, and ledger-keeping savings for Self-Help Groups (SHGs).",
    image: womenImg,
    location: "Haveri Region"
  },
  {
    id: "gal-4",
    title: "Community Rainwater Harvesting Dam",
    category: "environment",
    description: "Groundwater recharge dams built near drier farming sub-sectors to preserve high-yield crops under monsoon delays.",
    image: waterImg,
    location: "Koppal District"
  },
  {
    id: "gal-5",
    title: "Climate Resilient Crop Diagnostics",
    category: "agriculture",
    description: "Marginal farmers checking leaf-tissue quality under organic advisory campaigns in Hubballi.",
    image: heroImg,
    location: "HBL Suburbs, Karnataka"
  }
];

// Preloaded Editorial Blogs
const defaultBlogs: BlogPost[] = [
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

export default function NgoWebsite() {
  // Navigation active states
  const [activeTab, setActiveTab] = useState<string>("agriculture");
  const [donateAmount, setDonateAmount] = useState<number>(5000);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [contactLoading, setContactLoading] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  // Share receipt / donation state
  const [donationSuccess, setDonationSuccess] = useState<string | null>(null);
  const [donationLoading, setDonationLoading] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [donationForm, setDonationForm] = useState({
    donorName: "",
    donorPan: "",
    email: "",
    phone: "",
    isIndianCitizen: true
  });
  const [showDonateModal, setShowDonateModal] = useState<boolean>(false);

  // --- Dynamic states for Gallery & Blog Sections ---
  const [galleryCategory, setGalleryCategory] = useState<string>("all");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [dynamicGallery, setDynamicGallery] = useState<GalleryItem[]>([]);
  
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  
  // Storage for submissions displayed contextually to the Admin
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [donationSubmissions, setDonationSubmissions] = useState<any[]>([]);

  // Admin access control states
  const [showAdminPortal, setShowAdminPortal] = useState<boolean>(false);
  const [adminPasskey, setAdminPasskey] = useState<string>("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [adminTab, setAdminTab] = useState<string>("blogs");

  // Blog creation/editing states inside Admin Console
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogFormTitle, setBlogFormTitle] = useState("");
  const [blogFormCategory, setBlogFormCategory] = useState<any>("Agriculture");
  const [blogFormAuthor, setBlogFormAuthor] = useState("");
  const [blogFormDate, setBlogFormDate] = useState("");
  const [blogFormReadTime, setBlogFormReadTime] = useState("4 min read");
  const [blogFormCoverImage, setBlogFormCoverImage] = useState("soil");
  const [blogFormSummary, setBlogFormSummary] = useState("");
  const [blogFormContent, setBlogFormContent] = useState("");

  // Gallery creation/editing states inside Admin Console
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryFormTitle, setGalleryFormTitle] = useState("");
  const [galleryFormCategory, setGalleryFormCategory] = useState<string>("agriculture");
  const [galleryFormDescription, setGalleryFormDescription] = useState("");
  const [galleryFormLocation, setGalleryFormLocation] = useState("");
  const [galleryFormType, setGalleryFormType] = useState<"image" | "video">("image");
  const [galleryFormImage, setGalleryFormImage] = useState("soil");
  const [galleryFormVideoUrl, setGalleryFormVideoUrl] = useState("");

  // Hydrate client databases cleanly on mount and avoid SSR issues
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Defer state updates to prevent synchronous cascade warnings in Next.js
      setTimeout(() => {
        // 1. Fetch Blogs dynamically from server API or fallback securely
        fetch("/api/blogs")
          .then((res) => {
            if (!res.ok) throw new Error("Server error, status: " + res.status);
            return res.json();
          })
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setBlogs(data);
              localStorage.setItem("raitamitra_blogs", JSON.stringify(data));
            } else {
              setBlogs(defaultBlogs);
            }
          })
          .catch((err) => {
            console.warn("Could not retrieve blogs from server, loading offline:", err);
            const storedBlogs = localStorage.getItem("raitamitra_blogs");
            if (storedBlogs) {
              try {
                setBlogs(JSON.parse(storedBlogs));
              } catch (e) {
                setBlogs(defaultBlogs);
              }
            } else {
              setBlogs(defaultBlogs);
              localStorage.setItem("raitamitra_blogs", JSON.stringify(defaultBlogs));
            }
          });

        // 2. Load Inquiries list
        const storedInquiries = localStorage.getItem("raitamitra_inquiries");
        if (storedInquiries) {
          try {
            setContactSubmissions(JSON.parse(storedInquiries));
          } catch (e) {}
        }

        // 3. Load Donation Pledges
        const storedPledges = localStorage.getItem("raitamitra_pledges");
        if (storedPledges) {
          try {
            setDonationSubmissions(JSON.parse(storedPledges));
          } catch (e) {}
        }

        // 4. Load Live Gallery dynamically
        fetch("/api/gallery")
          .then((res) => {
            if (!res.ok) throw new Error("Server error, status: " + res.status);
            return res.json();
          })
          .then((data) => {
            if (Array.isArray(data)) {
              setDynamicGallery(data);
              localStorage.setItem("raitamitra_gallery", JSON.stringify(data));
            }
          })
          .catch((err) => {
            console.warn("Could not retrieve gallery from server:", err);
            const storedGallery = localStorage.getItem("raitamitra_gallery");
            if (storedGallery) {
              try {
                setDynamicGallery(JSON.parse(storedGallery));
              } catch (e) {
                setDynamicGallery([]);
              }
            }
          });
      }, 0);
    }
  }, []);

  // Sync blogs to localStorage when updated
  const saveBlogsToSync = (updatedBlogs: BlogPost[]) => {
    setBlogs(updatedBlogs);
    if (typeof window !== "undefined") {
      localStorage.setItem("raitamitra_blogs", JSON.stringify(updatedBlogs));
    }
  };

  // Sync gallery to localStorage when updated
  const saveGalleryToSync = (updatedGallery: GalleryItem[]) => {
    setDynamicGallery(updatedGallery);
    if (typeof window !== "undefined") {
      localStorage.setItem("raitamitra_gallery", JSON.stringify(updatedGallery));
    }
  };

  // Helper to map cover image key to imported asset
  const getCoverImageAsset = (key: string) => {
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

  // Focus Areas Data (from PDF pages 2-4)
  const focusAreas: FocusArea[] = [
    {
      id: "agriculture",
      title: "Sustainable Agriculture & Farmer Empowerment",
      emoji: "🌾",
      icon: Sprout,
      impactFocus: "Increasing farmer income, reducing environmental risk, and ensuring long-term community agricultural sustainability.",
      items: [
        "Climate-resilient and sustainable organic farming practices",
        "Soil health enrichment and intensive water conservation methods",
        "Hands-on farmer training, capacity-building, and agricultural workshops",
        "Income diversification through high-yield and agri-based livelihoods",
        "Dedicated support and technical resources for small and marginal farmers"
      ],
      image: heroImg,
      color: "from-emerald-800 to-green-700"
    },
    {
      id: "women",
      title: "Women Empowerment & Livelihoods",
      emoji: "👩🤝👩",
      icon: Users,
      impactFocus: "Fostering financial independence, robust local decision-making power, and gender equality across rural districts.",
      items: [
        "Vocational skill development and business entrepreneurship training for rural women",
        "Formation, funding, and structural strengthening of Self-Help Groups (SHGs)",
        "Financial literacy education and structured access to sustainable income opportunities",
        "Digital tools accessibility and modern AI literacy initiatives tailored for women",
        "Leadership mentorship circles and community development-driven social empowerment"
      ],
      image: womenImg,
      color: "from-amber-700 to-amber-900"
    },
    {
      id: "education",
      title: "Education, Digital & AI Skill Development",
      emoji: "🤖",
      icon: GraduationCap,
      impactFocus: "Equipping rural youth and student communities with modern computer, professional, and entrepreneurship skills.",
      items: [
        "AI, foundational digital literacy, and emerging tech bootcamps",
        "Tailored skill development syllabi for rural youth and public school students",
        "Professional career readiness programs and job employability assistance",
        "Resource centers and community-based digital learning labs",
        "Grassroots innovation accelerators and entrepreneurship workshops"
      ],
      image: eduImg,
      color: "from-teal-800 to-cyan-900"
    },
    {
      id: "health",
      title: "Health, Nutrition & Community Well-being",
      emoji: "❤️",
      icon: Heart,
      impactFocus: "Ensuring healthier, active agrarian communities with significantly improved metrics of daily quality of life.",
      items: [
        "Preventive family healthcare awareness drives and clean water campaigns",
        "Comprehensive nutrition instruction and household hygiene practices",
        "Free rural health check-up camps and targeted specialist outreach missions",
        "Strategic emphasis on maternal healthcare, pediatric nutrition, and childcare services"
      ],
      image: heroImg, // fallback/shared image
      color: "from-rose-800 to-rose-950"
    },
    {
      id: "environment",
      title: "Environment & Climate Action",
      emoji: "🌱",
      icon: Leaf,
      impactFocus: "Cultivating adaptive, climate-resilient ecological basins and highly fertile sustainable eco-systems.",
      items: [
        "Natural resource conservation guidelines and organic waste management",
        "Watershed management, water harvesting technology, and soil conservation programs",
        "Districts-wide climate change awareness and responsive adaptation strategies",
        "Active promotion of eco-friendly green businesses and zero-carbon local livelihoods"
      ],
      image: heroImg,
      color: "from-green-800 to-emerald-950"
    },
    {
      id: "livelihood",
      title: "Livelihoods & Rural Entrepreneurship",
      emoji: "💼",
      icon: Briefcase,
      impactFocus: "Nurturing robust secondary income generation options and thriving micro-enterprises.",
      items: [
        "Skill-based village employment generation and apprentice programs",
        "Structured business support for rural micro-enterprises and local agricultural startups",
        "Advanced financial management training and reliable market-linkage networks",
        "Direct encouragement and branding of local arts, indigenous crafts, and cottage industries"
      ],
      image: womenImg,
      color: "from-stone-700 to-neutral-800"
    }
  ];

  // Legal and Compliance Details (from PDF page 5)
  const complianceSpecs: ComplianceItem[] = [
    {
      label: "Registered Under",
      value: "Indian Trusts Act, 1882",
      description: "Operates as a registered public charitable trust since 2021 (Reg No: HBL-4-00006-2021-22).",
      icon: Building
    },
    {
      label: "NGO Darpan ID",
      value: "KA/2023/0342549",
      description: "Verified on the NITI Aayog portal, Government of India, for full accountability.",
      icon: Info
    },
    {
      label: "PAN Number",
      value: "AAETR3286K",
      description: "Registered under the Income Tax Department of India.",
      icon: ShieldCheck
    },
    {
      label: "CSR Registration",
      value: "CSR00059487",
      description: "Eligible for Corporate Social Responsibility programs under MCA guidelines.",
      icon: Award
    },
    {
      label: "80G Provisional Approval",
      value: "Valid AY 2024-25 to 2026-27",
      description: "Entitles domestic donors to 50% tax deductions on contributions.",
      icon: Percent
    }
  ];

  // Map donation amount to impact visual feedback
  const getImpactMessageOnAmount = (amount: number) => {
    if (amount < 2000) {
      return {
        desc: "Organic seed packs & professional soil testing",
        scale: `Supports ${Math.max(1, Math.floor(amount / 500))} marginalized family farmer(s) with bio-fertilizers and core agricultural inputs.`
      };
    } else if (amount < 10000) {
      return {
        desc: "Digital & AI tools training sponsorship",
        scale: `Funds comprehensive computer literacy and digital tools education for ${Math.max(1, Math.floor(amount / 3000))} rural youth for standard programs.`
      };
    } else if (amount < 30000) {
      return {
        desc: "Women SHG microenterprise startup grant",
        scale: `Provides direct capital, resources, and mentorship to coordinate setup for a local Self-Help Group (SHG) enabling sustainable self-reliance.`
      };
    } else {
      return {
        desc: "Village healthcare & climate action initiatives",
        scale: `Sponsors full physical health camps including preventive care, maternal assistance, water diagnostic studies, and organic farming workshops for a farming hamlet.`
      };
    }
  };

  const currentImpact = getImpactMessageOnAmount(donateAmount);

  // Handle Contact Inquiry Form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      const data = await response.json();
      if (response.ok) {
        setContactSuccess(data.message || "Message sent successfully!");
        
        // Push to local storage inquiries database for trustee portal
        const newInquiry = {
          id: `inq-${Date.now()}`,
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone || "N/A",
          subject: contactForm.subject,
          message: contactForm.message,
          date: new Date().toLocaleDateString("en-IN") + " " + new Date().toLocaleTimeString("en-IN")
        };
        const updated = [newInquiry, ...contactSubmissions];
        setContactSubmissions(updated);
        if (typeof window !== "undefined") {
          localStorage.setItem("raitamitra_inquiries", JSON.stringify(updated));
        }

        setContactForm({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: ""
        });
      } else {
        setContactSuccess(`Error: ${data.error || "Failed to submit"}`);
      }
    } catch (err) {
      setContactSuccess("Network error, please try again later.");
    } finally {
      setContactLoading(false);
    }
  };

  // Handle Donation Form
  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDonationLoading(true);
    setDonationSuccess(null);

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: donationForm.donorName,
          donorPan: donationForm.donorPan,
          email: donationForm.email,
          phone: donationForm.phone,
          amount: donateAmount
        })
      });
      const data = await response.json();
      if (response.ok) {
        setDonationSuccess("Pledge registered successfully!");
        setReceiptData(data.receipt);

        // Push to local storage pledges database for trustee portal
        const newPledge = {
          id: `plg-${Date.now()}`,
          receiptNumber: data.receipt.receiptNumber,
          donorName: donationForm.donorName,
          donorPan: donationForm.donorPan || "N/A",
          email: donationForm.email,
          phone: donationForm.phone || "N/A",
          amount: donateAmount,
          date: data.receipt.date
        };
        const updated = [newPledge, ...donationSubmissions];
        setDonationSubmissions(updated);
        if (typeof window !== "undefined") {
          localStorage.setItem("raitamitra_pledges", JSON.stringify(updated));
        }
      } else {
        setDonationSuccess(`Error: ${data.error}`);
      }
    } catch (err) {
      setDonationSuccess("Error connecting to server. Try again.");
    } finally {
      setDonationLoading(false);
    }
  };

  const handleQuickAmt = (amt: number) => {
    setDonateAmount(amt);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-600/20 selection:text-emerald-950">
      {/* Top Bar Logo & Navigation Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <a href="#hero" className="flex items-center space-x-3 group outline-hidden">
            <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 transition-all group-hover:scale-105">
              <Leaf className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="font-display text-xl font-bold tracking-tight text-emerald-900">
                  Raita Mitra
                </span>
                <span className="font-sans text-[10px] uppercase font-semibold tracking-wider text-amber-500 bg-amber-50 px-1 rounded-sm border border-amber-100">
                  Social Trust
                </span>
              </div>
              <span className="text-[10px] text-stone-500 font-mono tracking-tight block mt-0.5 leading-none">
                Hubballi, Karnataka • Reg: 2021
              </span>
            </div>
          </a>

          {/* Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center space-x-5 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <Link href="/about" className="hover:text-emerald-700 transition-colors">About</Link>
            <a href="#focus-areas" className="hover:text-emerald-700 transition-colors">Our Focus</a>
            <a href="#gallery" className="hover:text-emerald-700 transition-colors text-emerald-800 font-bold border-b-2 border-emerald-700 pb-0.5">Project Gallery</a>
            <a href="#blog" className="hover:text-emerald-700 transition-colors text-emerald-800 font-bold border-b-2 border-emerald-700 pb-0.5">Trust Blog</a>
            <a href="#compliance" className="hover:text-emerald-700 transition-colors">Compliance</a>
            <a href="#impact" className="hover:text-emerald-700 transition-colors">Impact & Pledge</a>
            <a href="#contact" className="hover:text-emerald-700 transition-colors">Contact</a>
            <button
              onClick={() => {
                setShowAdminPortal(true);
                setAdminLoginError(null);
              }}
              style={{ paddingLeft: '8px', paddingRight: '8px' }}
              className="cursor-pointer inline-flex items-center space-x-1 underline text-[10px] text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-md py-1 border border-emerald-200 transition-all font-mono"
            >
              <Lock className="w-3 h-3 text-emerald-700" />
              <span>Trustee Portal</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative bg-emerald-950 text-white overflow-hidden py-24 sm:py-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg.src}
            alt="Karnataka farmers lush green fields"
            className="w-full h-full object-cover object-center opacity-30 select-none scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-1.5 bg-emerald-800/60 border border-emerald-700/60 rounded-full px-3 py-1 text-xs text-emerald-200 mb-6 backdrop-blur-xs font-mono"
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              <span>Registered Public Charitable Trust</span>
            </motion.div>

            {/* Slogan */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              Empowering Farmers, <br />
              <span className="text-amber-400">Strengthening Communities</span>
            </motion.h1>

            {/* Sub-text description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-300 text-base sm:text-lg mb-10 leading-relaxed max-w-2xl"
            >
              Raita Mitra Social Trust (R) dedicates practical grassroots initiatives to improve access to modern agriculture education, women&apos;s financial self-reliance, healthcare check-ups, and technology skill programs across rural Karnataka.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#impact"
                className="inline-flex justify-center items-center px-6 py-3 border.5 border-transparent text-sm font-medium rounded-lg text-emerald-950 bg-amber-400 hover:bg-amber-500 transition-colors shadow-sm font-semibold active:scale-98"
              >
                Estimate Donation Tax Savings
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a
                href="#focus-areas"
                className="inline-flex justify-center items-center px-6 py-3 border border-stone-500/80 hover:bg-white/10 text-stone-200 hover:text-white transition-all text-sm font-medium rounded-lg backdrop-blur-xs"
              >
                Our 6 Key Focus Areas
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brief Key Stats Dashboard Board */}
      <section className="bg-emerald-900 text-white border-y border-emerald-800/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-amber-400">2021</div>
              <div className="text-xs text-emerald-200 mt-1 font-mono uppercase tracking-wider">Registered in Hubballi</div>
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-amber-400">80G & CSR</div>
              <div className="text-xs text-emerald-200 mt-1 font-mono uppercase tracking-wider">Tax-Exempt Approved</div>
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-amber-400">Karnataka</div>
              <div className="text-xs text-emerald-200 mt-1 font-mono uppercase tracking-wider">Operational Area</div>
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-amber-400">100%</div>
              <div className="text-xs text-emerald-200 mt-1 font-mono uppercase tracking-wider">Grassroots Transparency</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us, Vision & Mission Sections */}
      <section id="about" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono block mb-2">Who We Are</span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-stone-950 tracking-tight leading-tight">
                  Uplifting Farmers, Revitalizing Communities
                </h2>
              </div>

              <div className="space-y-5 text-stone-600 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>Raita Mitra Social Trust (R)</strong> was established in 2021 in **Hubballi, Karnataka**, to promote sustainable livelihoods, upgrade education access, host healthcare services, and deliver skill training in agrarian societies. We operate as a compliant, audited public charitable trust.
                </p>
                <p>
                  Our primary direction is supporting farmers and rural families through practical initiatives that strengthen economic independence, physical resilience, and ecological awareness. By connecting industrial knowledge, modern innovations, and proactive grassroots action, we seek to generate equal access to critical training.
                </p>
                <p>
                  Our work spans multiple districts including <strong>Dharwad, Belagavi, Haveri, Raichur, Koppal, and more</strong>, tackling local ecological challenges with structured long-term solutions.
                </p>
              </div>

              {/* Compliance Badging Cards */}
              <div className="pt-4 border-t border-stone-200/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-stone-200/50 shadow-2xs flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 font-sans">Indian Trusts Act, 1882</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">Officially registered and compliant public trust governance.</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-stone-200/50 shadow-2xs flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 font-sans">80G Tax-Exempt Status</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">Authorizes tax deductions on eligible donations securely.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Vision & Mission Column */}
            <div className="lg:col-span-5 space-y-6 lg:mt-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -z-10 opacity-70" />
              
              <div className="space-y-6">
                {/* Vision Box */}
                <div className="border-l-4 border-amber-500 pl-4 py-1">
                  <span className="text-[10px] font-bold tracking-wider text-amber-600 uppercase font-mono block">Our Vision</span>
                  <h3 className="font-display text-lg font-bold text-stone-950 mt-1">Self-reliant rural communities</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    To build self-reliant rural communities by empowering farmers, enhancing livelihoods, and enabling equal access to quality education, protective healthcare, and economic opportunities.
                  </p>
                </div>

                <hr className="border-stone-100" />

                {/* Mission Box */}
                <div className="border-l-4 border-emerald-600 pl-4 py-1">
                  <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase font-mono block">Our Mission</span>
                  <h3 className="font-display text-lg font-bold text-stone-950 mt-1">Grassroots structural action</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    To support farmers and rural families through sustainable development initiatives, livelihood programs, technical skill training, and cooperative community actions that promote solid economic growth, social equity, and active environmental responsibility.
                  </p>
                </div>

                <hr className="border-stone-100" />

                {/* Why Support Us */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-bold tracking-wider text-stone-500 uppercase font-mono block">Why Trust Us?</span>
                  <ul className="text-xs text-stone-600 space-y-2.5">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Transparent compliance with statutory regulations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Grassroots-driven planning and regional participation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Long-term focus over superficial, temporary outcomes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Focus Areas Interactive Section */}
      <section id="focus-areas" className="py-24 bg-white border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono">Structure of Action</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-950 mt-2 tracking-tight">
              Our Primary Focus Areas
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
              We approach rural empowerment from multiple integrated dimensions to build healthy ecosystems, skilled youth, and financially secure farm households.
            </p>
          </div>

          {/* Tab Selector Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {focusAreas.map((area) => {
              const IconComp = area.icon;
              const isActive = activeTab === area.id;
              return (
                <button
                  key={area.id}
                  onClick={() => setActiveTab(area.id)}
                  className={`cursor-pointer group flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                    isActive
                      ? "bg-emerald-800 text-white border-emerald-800 shadow-md scale-102"
                      : "bg-stone-50/50 text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors mb-2.5 ${
                    isActive ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-800 group-hover:bg-emerald-100"
                  }`}>
                    <IconComp className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="text-xs font-semibold leading-tight line-clamp-2">
                    {area.title.split(" & ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel with Motion Display */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200/60 overflow-hidden shadow-xs">
            <AnimatePresence mode="wait">
              {focusAreas.map((area) => {
                if (area.id !== activeTab) return null;
                const IconComp = area.icon;
                return (
                  <motion.div
                    key={area.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12"
                  >
                    {/* Details Side */}
                    <div className="p-8 sm:p-10 lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Title & Badge */}
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="text-2xl">{area.emoji}</span>
                          <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/50 px-2.5 py-1 rounded">
                            Active Initiative
                          </span>
                        </div>
                        
                        <h3 className="font-display text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-tight mb-3">
                          {area.title}
                        </h3>

                        <p className="text-sm font-medium text-stone-700 bg-emerald-50 border-l-2 border-emerald-600 p-3.5 rounded-r-lg mb-8 italic">
                          <strong>Impact Goal:</strong> {area.impactFocus}
                        </p>

                        <div className="space-y-3.5">
                          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono">Core Programs & Work</h4>
                          <ul className="space-y-3 text-sm text-stone-600">
                            {area.items.map((item, idx) => (
                              <li key={idx} className="flex items-start space-x-2.5">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA in Box */}
                      <div className="mt-10 pt-6 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4">
                        <div className="text-xs text-stone-500">
                          Active districts: Hubballi, Dharwad, Belagavi, and across Karnataka
                        </div>
                        <button
                          onClick={() => {
                            setShowDonateModal(true);
                            setDonationSuccess(null);
                            setReceiptData(null);
                          }}
                          className="cursor-pointer inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                        >
                          <span>Support this initiative</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Image / Visualization Column */}
                    <div className="lg:col-span-5 relative bg-emerald-950 min-h-[320px] lg:min-h-full">
                      <img
                        src={area.image.src}
                        alt={area.title}
                        className="w-full h-full object-cover opacity-60"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-transparent to-transparent lg:bg-gradient-to-l lg:from-emerald-950 lg:via-transparent lg:to-transparent" />
                      
                      {/* Quote/Signoff Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 text-white bg-black/40 backdrop-blur-xs p-4 rounded-xl border border-white/10">
                        <p className="text-xs italic font-medium">
                          &ldquo;Working together with marginalized communities to generate accessible water technologies, gender-equal livelihoods, and AI literacy skills.&rdquo;
                        </p>
                        <span className="block text-[10px] uppercase font-mono tracking-wider font-bold text-amber-400 mt-2">
                          — Raita Mitra Trust Coordination Center
                        </span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ================= PROJECT GALLERY SECTION ================= */}
      <section id="gallery" className="py-24 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono block mb-2">Visual Footprints</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Our Ongoing Grassroots Actions
            </h2>
            <p className="text-stone-500 text-sm mt-3 leading-relaxed">
              Real-world project updates from rural Karnataka coordinator offices. Each picture portrays local farmers, youth, and cooperatives actively receiving educational and material aid.
            </p>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { name: "All Projects", key: "all" },
                { name: "🌾 Agriculture", key: "agriculture" },
                { name: "🤖 Education", key: "education" },
                { name: "👩🤝👩 Women SHG", key: "women" },
                { name: "🌱 Environment", key: "environment" }
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setGalleryCategory(cat.key)}
                  className={`cursor-pointer text-xs font-bold px-4 py-2 rounded-full transition-all border ${
                    galleryCategory === cat.key
                      ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                      : "bg-white text-stone-600 border-stone-200 hover:border-emerald-600/50 hover:bg-emerald-50/20"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {(dynamicGallery.length > 0 ? dynamicGallery : defaultGallery)
                .filter((item) => galleryCategory === "all" || item.category === galleryCategory)
                .map((item) => {
                  const resolvedImg = getGalleryImage(item.image);
                  const imageSrc = resolvedImg && typeof resolvedImg === "object" && "src" in resolvedImg ? resolvedImg.src : resolvedImg;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={item.id}
                      onClick={() => setSelectedGalleryItem(item)}
                      className="cursor-pointer group relative bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all h-[360px] flex flex-col justify-end"
                    >
                      <div className="absolute inset-0 z-0">
                        <img
                          src={imageSrc}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent z-10" />
                        
                        {/* Interactive Play Video Circle Overlay */}
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center z-15">
                            <div className="bg-emerald-950/90 text-white p-4 rounded-full shadow-lg group-hover:scale-110 group-hover:bg-amber-450 group-hover:text-stone-950 transition-all border border-emerald-750/30">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative z-20 p-6 text-white space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                          <span className="flex items-center space-x-1">
                            {item.type === "video" && <Video className="w-3.5 h-3.5 mr-1 text-emerald-400 shrink-0" />}
                            {item.category}
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                            <span>{item.location}</span>
                          </span>
                        </div>
                        <h4 className="font-display text-base font-bold leading-tight group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          {item.description}
                        </p>
                        <div className="pt-2 flex items-center text-xs font-bold text-amber-400 space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>{item.type === "video" ? "Play Campaign Video" : "View Large Photograph"}</span>
                          {item.type === "video" ? <Play className="w-3 h-3 fill-current" /> : <Eye className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ================= BLOG AND NEWS HUB SECTION ================= */}
      <section id="blog" className="py-24 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono block mb-2">Publications & Logs</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-none">
                Trust News, Farming Guides & Reports
              </h2>
              <p className="text-stone-500 text-sm mt-3 leading-relaxed max-w-2xl">
                Read scientific farming guides, AI-school curricula insights, and official regional operations reports written directly by our managers and trustees on the ground.
              </p>
            </div>
            
            <button
              onClick={() => {
                setShowAdminPortal(true);
                setAdminLoginError(null);
              }}
              style={{ paddingLeft: '16px', paddingRight: '16px' }}
              className="cursor-pointer bg-stone-100 hover:bg-emerald-50 text-emerald-900 hover:text-emerald-950 border border-stone-200 hover:border-emerald-200 font-bold text-xs py-3 rounded-xl flex items-center space-x-2 transition-all shrink-0 active:scale-98"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-700" />
              <span>Trustee Editorial Console</span>
            </button>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-stone-50 border border-stone-100 rounded-2xl">
                <BookOpen className="w-8 h-8 text-stone-400 mx-auto opacity-60 mb-2" />
                <p className="text-xs text-stone-500 font-medium">No blog posts available right now. Launch the portal to create one!</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-stone-50 rounded-3xl border border-stone-200/80 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all"
                >
                  <div>
                    {/* Cover image wrap */}
                    <div className="relative h-48 bg-stone-100 overflow-hidden">
                      <img
                        src={getCoverImageAsset(blog.coverImage).src}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-emerald-800 text-white text-[9px] font-bold uppercase tracking-wider font-mono px-2.5 py-1 rounded-full border border-emerald-700/80">
                        {blog.category}
                      </div>
                    </div>

                    {/* Content text */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-3 text-[10px] font-semibold text-stone-400 font-mono">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{blog.date}</span>
                        </span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      
                      <h3 className="font-display font-bold text-stone-900 text-lg leading-snug hover:text-emerald-700 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-400 font-sans tracking-tight">By {blog.author.split(" (")[0]}</span>
                    <Link
                      href={`/blog/${blog.id}`}
                      className="cursor-pointer text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center space-x-1 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>

        </div>
      </section>

      {/* Compliance & Legal Hub */}
      <section id="compliance" className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono block">Statutory Compliance</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Governance, Legal Status & Accreditations
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Raita Mitra Social Trust is structured as a compliant, legally validated charitable trust under Indian regulations. We prioritize governance and statutory accountability to ensure 100% appropriate utilization of resources.
              </p>

              {/* Badges Column */}
              <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-800 shadow-sm relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-800 rounded-full blur-2xl" />
                <div className="relative z-10 flex items-start space-x-3.5">
                  <div className="p-2.5 bg-yellow-400/20 rounded-lg text-yellow-400 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">Section 80G Approval</h4>
                    <p className="text-[11px] text-stone-300 mt-1">
                      Our trust is provisionally approved under section 80G of the Income Tax Act. Indian tax payers are eligible for 50% exemptions on pledges and contributions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Compliance specs grid */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
                
                <h3 className="font-sans text-xs font-bold text-stone-400 uppercase tracking-wider font-mono mb-6">
                  Official Registration Registry
                </h3>

                <div className="divide-y divide-stone-100">
                  {complianceSpecs.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 mt-1">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <span className="text-xs font-semibold text-stone-500 font-mono">{item.label}</span>
                            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 font-sans tracking-tight">
                              {item.value}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1 leading-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Impact Estimator & Support Section */}
      <section id="impact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono">Micro-Finance Impact</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-950 mt-1 tracking-tight">
              Interactive Impact Calculator
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-2">
              Drag the slider to see how your contribution directly finances crucial resources, seeds, and digital laptops in Karnataka.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Slider Configurator Side */}
            <div className="lg:col-span-6 bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-6">Choose Contribution Level</h3>

                {/* Amount Display */}
                <div className="text-center bg-white border border-stone-200/60 rounded-2xl p-6 mb-8 shadow-xs">
                  <span className="text-xs text-stone-400 font-mono block uppercase">Pledge Amount</span>
                  <span className="text-4xl sm:text-5xl font-display font-black text-emerald-800 tracking-tight block mt-1">
                    ₹{donateAmount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-stone-500 font-medium block mt-1 font-mono">
                    Eligible 80G Tax Exemption: ₹{(donateAmount * 0.5).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Slider bar */}
                <div className="space-y-4 mb-8">
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={donateAmount}
                    onChange={(e) => setDonateAmount(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                  />
                  <div className="flex justify-between text-[11px] text-stone-500 font-mono font-medium">
                    <span>₹1,000</span>
                    <span>₹25,000</span>
                    <span>₹50,000</span>
                    <span>₹75,000</span>
                    <span>₹100,000+</span>
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[2000, 5000, 15000, 50000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleQuickAmt(preset)}
                      className={`cursor-pointer text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                        donateAmount === preset
                          ? "bg-emerald-800 text-white border-emerald-800"
                          : "bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      ₹{preset.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Impact Display Box */}
              <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-2xl p-5">
                <div className="flex items-center space-x-2 text-emerald-900 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold font-mono tracking-wider uppercase">Direct Funding Impact</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 mt-1">{currentImpact.desc}</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{currentImpact.scale}</p>
              </div>

            </div>

            {/* Donation Form pledge simulator */}
            <div className="lg:col-span-6 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-800 rounded-full blur-3xl opacity-30 -z-5 animate-pulse" />
              
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Provisional Tax Pledge
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold mb-2">Simulate Your Donation Pledge</h3>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  Enter your details below to coordinate a pledge and view a provisional 80G tax receipt calculated directly by our system.
                </p>

                <form onSubmit={handleDonationSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">
                        Primary Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={donationForm.donorName}
                        onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full text-xs bg-zinc-800 text-white border border-zinc-700 rounded-lg p-2.5 focus:outline-hidden focus:border-amber-400 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">
                        PAN Number (For tax deduction)
                      </label>
                      <input
                        type="text"
                        value={donationForm.donorPan}
                        onChange={(e) => setDonationForm({ ...donationForm, donorPan: e.target.value })}
                        placeholder="e.g. ABCDE1234F"
                        maxLength={10}
                        className="w-full text-xs bg-zinc-800 text-white border border-zinc-700 rounded-lg p-2.5 focus:outline-hidden focus:border-amber-400 font-mono uppercase font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={donationForm.email}
                        onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                        placeholder="donor@example.com"
                        className="w-full text-xs bg-zinc-800 text-white border border-zinc-700 rounded-lg p-2.5 focus:outline-hidden focus:border-amber-400 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={donationForm.phone}
                        onChange={(e) => setDonationForm({ ...donationForm, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full text-xs bg-zinc-800 text-white border border-zinc-700 rounded-lg p-2.5 focus:outline-hidden focus:border-amber-400 font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="citizen"
                      checked={donationForm.isIndianCitizen}
                      onChange={(e) => setDonationForm({ ...donationForm, isIndianCitizen: e.target.checked })}
                      className="rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-opacity-50"
                    />
                    <label htmlFor="citizen" className="text-[11px] text-zinc-400 cursor-pointer">
                      I am an Indian Citizen eligible for Section 80G tax benefits.
                    </label>
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    id="pledge-donate-submit"
                    disabled={donationLoading}
                    className="cursor-pointer w-full bg-amber-400 hover:bg-amber-500 disabled:bg-zinc-700 text-zinc-950 font-bold text-xs py-3 rounded-lg flex items-center justify-center space-x-1 shadow-sm mt-4 active:scale-98"
                  >
                    {donationLoading ? (
                      <span>Validating Pledge...</span>
                    ) : (
                      <>
                        <span>Pledge ₹{donateAmount.toLocaleString("en-IN")} & Create Receipt</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Status Message and Link to Modal */}
              <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">
                  Secured simulation • Under 80G Approval
                </span>
                {receiptData && (
                  <button
                    onClick={() => setShowDonateModal(true)}
                    className="cursor-pointer text-xs text-amber-400 hover:text-amber-500 font-bold flex items-center space-x-1"
                  >
                    <span>View Generated 80G Receipt</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Contact & Registration Office Section */}
      <section id="contact" className="py-24 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact coordinates column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono block mb-2">Reach Out Outside</span>
                <h2 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                  Contact Us & Coordinate Location
                </h2>
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  Have questions about our initiatives, volunteer drives, or compliance transparency documents? Contact our Hubballi coordination office today.
                </p>
              </div>

              {/* Coordinates List from PDF page 5 */}
              <div className="space-y-6">
                
                {/* Registered Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest font-mono">Registered Office</h4>
                    <p className="text-sm font-semibold text-stone-900 mt-1">#37, First Floor, Pride Icon</p>
                    <p className="text-xs text-stone-600 mt-0.5">Gokul Road, Hubballi – 580030, Karnataka, India</p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest font-mono">Telephone Number</h4>
                    <a href="tel:+917676376221" className="text-sm font-semibold text-emerald-800 hover:underline block mt-1">
                      +91 7676376221
                    </a>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest font-mono">Email Address</h4>
                    <a href="mailto:raitamitrasocialtrust@gmail.com" className="text-sm font-semibold text-emerald-800 hover:underline block mt-1">
                      raitamitrasocialtrust@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Contact form column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
                
                <h3 className="font-display text-lg font-bold text-stone-900 mb-6">Send a Message Directly</h3>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-hidden focus:border-emerald-700 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-hidden focus:border-emerald-700 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                        Contact Number / Mobile
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 Mobile number"
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-hidden focus:border-emerald-700 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                      Subject
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-hidden focus:border-emerald-700 font-semibold"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Volunteering">Volunteering Opportunities</option>
                      <option value="CSR Integration">CSR Program Integration</option>
                      <option value="Agricultural Training">Farmer Training Coordination</option>
                      <option value="80G Compliance">80G Compliance Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                      Message details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-hidden focus:border-emerald-700 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-form-submit"
                    disabled={contactLoading}
                    className="cursor-pointer w-full bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center space-x-1 shadow-sm mt-2 active:scale-98"
                  >
                    {contactLoading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  {/* Feedback overlay */}
                  {contactSuccess && (
                    <div className={`text-xs font-semibold p-3 rounded-lg mt-3 ${
                      contactSuccess.startsWith("Error") ? "bg-red-50 text-red-800 border border-red-100" : "bg-emerald-50 text-emerald-800 border border-emerald-100"
                    }`}>
                      {contactSuccess}
                    </div>
                  )}
                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1 info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-emerald-500" />
                <span className="font-display text-lg font-bold text-white tracking-tight">Raita Mitra Social Trust</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Registered non-profit public charitable trust under the Indian Trusts Act, 1882 working proactively to improve rural livelihoods across Karnataka.
              </p>
              <div className="text-[10px] font-mono text-stone-600">
                Hubballi Registration: HBL-4-00006-2021-22 <br />
                80G Provisional Exemption Approved
              </div>
            </div>

            {/* Column 2 navigation */}
            <div>
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono mb-4">Quick Links</h4>
              <ul className="text-xs space-y-2.5">
                <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Our Trust</Link></li>
                <li><a href="#focus-areas" className="hover:text-amber-400 transition-colors">6 Primary Focus Areas</a></li>
                <li><a href="#compliance" className="hover:text-amber-400 transition-colors">Statutory Compliance Registry</a></li>
                <li><a href="#impact" className="hover:text-amber-400 transition-colors">Impact Pricing Calculator</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Reach Hubballi Office</a></li>
              </ul>
            </div>

            {/* Column 3 active operational districts */}
            <div>
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono mb-4">Operational Area</h4>
              <p className="text-xs leading-relaxed text-stone-500 mb-3">
                Expanding rural programs across multiple districts of Karnataka, specifically:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Dharwad", "Belagavi", "Haveri", "Raichur", "Koppal", "Hubballi Rural"].map((d, i) => (
                  <span key={i} className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded border border-stone-700/60 font-medium">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 4 support details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono mb-4">Partner with Us</h4>
              <p className="text-xs leading-relaxed text-stone-500">
                Support rural micro-enterprises, agricultural soil science, water conservancy, and computer technology for youth.
              </p>
              <button
                onClick={() => {
                  setShowDonateModal(true);
                  setDonationSuccess(null);
                  setReceiptData(null);
                }}
                className="cursor-pointer w-full text-center bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center space-x-1 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                <span>Submit Donation Pledge</span>
              </button>
            </div>

          </div>

          <hr className="border-stone-800 my-8" />

          {/* Sub signature */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-600">
            <div>
              &copy; {new Date().getFullYear()} Raita Mitra Social Trust (R). All Rights Reserved.
            </div>
            <div className="flex space-x-4">
              <span className="font-mono">NGO Darpan: KA/2023/0342549</span>
              <span className="font-mono">PAN: AAETR3286K</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Modal showing Receipt / Impact Calculator results */}
      {showDonateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-stone-200 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="p-6 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-amber-400" />
                <h3 className="font-display text-lg font-bold">Raita Mitra Trust Receipt Simulator</h3>
              </div>
              <button
                onClick={() => setShowDonateModal(false)}
                className="text-stone-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[75vh]">
              {!receiptData ? (
                // Form if receipt is not generated yet
                <div className="space-y-6">
                  <div className="bg-emerald-50 border-l-2 border-emerald-600 p-4 rounded-r-xl">
                    <h4 className="text-xs font-bold text-emerald-900 font-mono uppercase tracking-wide">Interactive Pledge Info</h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      You are pledging to contribute **₹{donateAmount.toLocaleString("en-IN")}** to coordinate farm training or digital literacy resources. Under Section 80G, this qualifies for **50% Tax Exemption**.
                    </p>
                  </div>

                  <form onSubmit={handleDonationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                        Donation Amount (INR)
                      </label>
                      <input
                        type="number"
                        required
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(Number(e.target.value))}
                        className="w-full text-sm bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-hidden focus:border-emerald-700 font-bold text-emerald-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                          Pledge Donor Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={donationForm.donorName}
                          onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
                          placeholder="Full Name"
                          className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                          PAN Number (Optional)
                        </label>
                        <input
                          type="text"
                          value={donationForm.donorPan}
                          onChange={(e) => setDonationForm({ ...donationForm, donorPan: e.target.value })}
                          placeholder="ABCDE1234F"
                          maxLength={10}
                          className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-hidden font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                          Email address *
                        </label>
                        <input
                          type="email"
                          required
                          value={donationForm.email}
                          onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                          placeholder="donor@example.com"
                          className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
                          Mobile number
                        </label>
                        <input
                          type="tel"
                          value={donationForm.phone}
                          onChange={(e) => setDonationForm({ ...donationForm, phone: e.target.value })}
                          placeholder="+91 Mobile number"
                          className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 "
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={donationLoading}
                      className="cursor-pointer w-full bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center space-x-1 shadow-sm mt-2"
                    >
                      {donationLoading ? "Calculating receipt..." : "Generate Receipt Now"}
                    </button>
                  </form>
                </div>
              ) : (
                // Receipts visualization (PDF page 5 matching design perfectly)
                <div className="space-y-6">
                  
                  {/* Visual Toast */}
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3.5 rounded-xl text-xs font-semibold flex items-start space-x-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span>Pledge created successfully! Here is your provisional tax-exempt receipt:</span>
                    </div>
                  </div>

                  {/* High fidelity Receipt badge layout */}
                  <div className="border border-stone-300 p-6 sm:p-8 rounded-2xl bg-zinc-50 font-mono text-xs relative overflow-hidden text-stone-800 shadow-inner">
                    
                    {/* Watermark in background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
                      <Leaf className="w-64 h-64 text-emerald-900" />
                    </div>

                    {/* Header */}
                    <div className="text-center border-b border-stone-300 pb-4 mb-4 relative z-10">
                      <h4 className="font-sans font-black text-sm uppercase tracking-tight text-emerald-900 leading-none">
                        Raita Mitra Social Trust (R)
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-1 leading-normal font-sans">
                        #37, First Floor, Pride Icon, Gokul Road, Hubballi – 580030, Karnataka <br />
                        Reg: HBL-4-00006-2021-22 • NGO Darpan: KA/2023/0342549 • PAN: AAETR3286K
                      </p>
                      <div className="inline-block bg-amber-100 border border-amber-200 text-amber-900 px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider font-sans mt-2.5">
                        Provisional Receipt (Section 80G)
                      </div>
                    </div>

                    {/* Receipt Coordinates Grid */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-b border-stone-200 pb-4 mb-4 relative z-10 text-[10px]">
                      <div>
                        <span className="text-stone-400 h-4">RECEIPT NO:</span>
                        <p className="font-bold text-stone-950">{receiptData.receiptNumber}</p>
                      </div>
                      <div>
                        <span className="text-stone-400 h-4">DATE OF PLEDGE:</span>
                        <p className="font-bold text-stone-950">{receiptData.date}</p>
                      </div>
                      <div>
                        <span className="text-stone-400 h-4">DONOR NAME:</span>
                        <p className="font-bold text-stone-950 uppercase">{receiptData.donorName}</p>
                      </div>
                      <div>
                        <span className="text-stone-400 h-4">DONOR PAN:</span>
                        <p className="font-bold text-stone-950 font-mono">{receiptData.donorPan}</p>
                      </div>
                    </div>

                    {/* Financial summary calculations */}
                    <div className="bg-white border border-stone-200 rounded-lg p-3 relative z-10 space-y-1.5 text-[11px] font-sans">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Total Contribution:</span>
                        <span className="font-bold text-stone-950">₹{receiptData.amount.toLocaleString("en-IN")}.00</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-100 pt-1.5">
                        <span className="text-emerald-700 font-medium">80G Deductible (50%):</span>
                        <span className="font-bold text-emerald-800">₹{receiptData.taxDeductibleAmount.toLocaleString("en-IN")}.00</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-100 pt-1.5 text-[9px] text-stone-400 font-mono">
                        <span>Pledge Status:</span>
                        <span className="text-amber-600 font-bold uppercase tracking-wide">Pending Settlement</span>
                      </div>
                    </div>

                    {/* Instructions footer of receipt */}
                    <div className="mt-4 pt-4 border-t border-stone-200 text-[10px] text-stone-500 font-sans leading-relaxed">
                      <p>
                        <strong>Instructions:</strong> Save this provisional receipt as confirmation of your pledge. Complete your donation by transferring funds directly to our bank coordinate systems (sent via email). Final formal receipt under the Income Tax Form 10BE registry is issued upon bank clearance.
                      </p>
                    </div>

                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-3 justify-end pt-3">
                    <button
                      onClick={() => setReceiptData(null)}
                      className="cursor-pointer border border-stone-300 text-stone-700 font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-stone-50"
                    >
                      Edit Pledge Details
                    </button>
                    <button
                      onClick={() => {
                        alert("Your receipt simulation is saved locally. Thank you for your support!");
                        setShowDonateModal(false);
                      }}
                      className="cursor-pointer bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-emerald-950 flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span>Accept Provisional Certificate</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}

      {/* Lightbox Modal for Gallery */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl"
          >
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute top-4 right-4 z-50 text-white hover:text-amber-400 bg-black/50 hover:bg-black/80 rounded-full p-2 cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-8 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px] relative">
                {selectedGalleryItem.type === "video" ? (
                  <VideoPlayer url={selectedGalleryItem.videoUrl || ""} />
                ) : (
                  <img
                    src={(() => {
                      const resolvedImg = getGalleryImage(selectedGalleryItem.image);
                      return resolvedImg && typeof resolvedImg === "object" && "src" in resolvedImg ? resolvedImg.src : resolvedImg;
                    })()}
                    alt={selectedGalleryItem.title}
                    className="max-h-[500px] max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between text-stone-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    <span>{selectedGalleryItem.category}</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{selectedGalleryItem.location}</span>
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight leading-tight">
                    {selectedGalleryItem.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-emerald-500" />
                  <p className="text-stone-405 text-xs leading-relaxed text-stone-400">
                    {selectedGalleryItem.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-800 mt-6 flex flex-col gap-3">
                  <div className="text-[10px] text-stone-500">
                    Proactive community oversight • Raita Mitra Social Trust (R)
                  </div>
                  <button
                    onClick={() => {
                      setSelectedGalleryItem(null);
                      setShowDonateModal(true);
                    }}
                    className="cursor-pointer w-full text-center bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-lg flex items-center justify-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Support This Focus Area</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Immersive Blog Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full border border-stone-200 shadow-2xl flex flex-col"
          >
            {/* Read Sticky Header */}
            <div className="p-6 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900 shrink-0">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span className="text-xs uppercase font-mono tracking-widest font-bold text-emerald-200">
                  {selectedBlog.category} Publication
                </span>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="text-stone-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Read Body content */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[80vh] space-y-6">
              {/* Header title */}
              <div className="space-y-3">
                <h2 className="font-display text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
                  {selectedBlog.title}
                </h2>
                
                <div className="flex items-center space-x-4 text-xs font-semibold text-stone-404 text-stone-450 font-mono">
                  <span>By {selectedBlog.author}</span>
                  <span>|</span>
                  <span>{selectedBlog.date}</span>
                  <span>|</span>
                  <span>{selectedBlog.readTime}</span>
                </div>
              </div>

              {/* Cover cover */}
              <div className="relative h-64 w-full rounded-2xl bg-stone-100 overflow-hidden shrink-0">
                <img
                  src={getCoverImageAsset(selectedBlog.coverImage).src}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Formatted body styled manually */}
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-4 font-sans whitespace-pre-wrap pt-2">
                {selectedBlog.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("### ")) {
                    return (
                      <h3 key={i} className="font-display text-lg sm:text-xl font-bold text-stone-955 pt-3 text-stone-900">
                        {para.replace("### ", "")}
                      </h3>
                    );
                  } else if (para.startsWith("#### ")) {
                    return (
                      <h4 key={i} className="font-sans text-xs uppercase font-bold tracking-wider text-emerald-800 pt-2 font-mono">
                        {para.replace("#### ", "")}
                      </h4>
                    );
                  } else if (para.startsWith("* ") || para.startsWith("- ")) {
                    const listItems = para.split("\n").map(li => li.replace(/^[-*]\s+/, ""));
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1.5 text-stone-600">
                        {listItems.map((item, idx) => (
                          <li key={idx} className="text-sm">{item}</li>
                        ))}
                      </ul>
                    );
                  } else if (para.match(/^\d+\.\s/)) {
                    const listItems = para.split("\n").map(li => li.replace(/^\d+\.\s+/, ""));
                    return (
                      <ol key={i} className="list-decimal pl-5 space-y-1.5 text-stone-605">
                        {listItems.map((item, idx) => (
                          <li key={idx} className="text-sm">{item}</li>
                        ))}
                      </ol>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>

              {/* Bottom footer signup */}
              <div className="mt-8 pt-6 border-t border-stone-200 bg-stone-50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-500">
                  Did this diagnostic guide or micro-enterprise report help you understand our grassroots work?
                </div>
                <button
                  onClick={() => {
                    setSelectedBlog(null);
                    setShowDonateModal(true);
                  }}
                  className="cursor-pointer bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2 px-4 rounded-lg block whitespace-nowrap"
                >
                  Sponsor This Sector
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}

      {/* Trustee / Administrative Portal Modal */}
      {showAdminPortal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full border border-stone-200 shadow-2xl flex flex-col h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-850 shrink-0">
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-amber-400" />
                <h3 className="font-display text-base font-bold tracking-tight">Raita Mitra Trustee Coordination Desk</h3>
                {isAdminLoggedIn && (
                  <span className="text-[9px] bg-emerald-900 text-emerald-300 font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-800 ml-2">
                    Authorized Session Active
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setShowAdminPortal(false);
                  setIsAdminLoggedIn(false);
                  setAdminPasskey("");
                  setEditingBlogId(null);
                }}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 bg-stone-50">
              {!isAdminLoggedIn ? (
                // Sign in Gate
                <div className="max-w-md mx-auto py-12 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto border border-amber-100">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-stone-900">Enter Secret Trustee Passkey</h4>
                    <p className="text-stone-500 text-xs">
                      Access official analytical metrics and upload dynamic blog publications onto the main website feed.
                    </p>
                  </div>

                  {/* Dev instructions warning */}
                  <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 text-[11px] text-amber-805 text-amber-800 space-y-1">
                    <p className="font-bold">🔑 Authorized Demonstration Passkey:</p>
                    <p className="font-semibold block font-mono bg-white border border-amber-110 border-amber-200 px-2 py-1 rounded inline-block mt-1">raitamitra2026</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (adminPasskey === "raitamitra2026") {
                        setIsAdminLoggedIn(true);
                        setAdminLoginError(null);
                      } else {
                        setAdminLoginError("Invalid passcode prefix. Try entering 'raitamitra2026'.");
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">Passkey Password</label>
                      <input
                        type="password"
                        required
                        value={adminPasskey}
                        onChange={(e) => setAdminPasskey(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full text-sm bg-white border border-stone-200 rounded-lg p-2.5 focus:outline-hidden focus:border-stone-800 text-center font-bold font-mono tracking-widest text-stone-900"
                      />
                    </div>

                    {adminLoginError && (
                      <p className="text-[11px] text-red-650 font-bold bg-red-50 p-2.5 rounded border border-red-100 text-center">
                        {adminLoginError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="cursor-pointer w-full bg-stone-900 hover:bg-stone-950 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center space-x-1.5"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Authenticate Trustee Session</span>
                    </button>
                  </form>
                </div>
              ) : (
                // Admin dashboard layout
                <div className="space-y-6">
                  
                  {/* Top Stats Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-stone-404 text-stone-400 uppercase font-mono block">Active Publications</span>
                        <p className="text-xl font-bold text-stone-905 text-stone-900">{blogs.length} Editorial Posts</p>
                      </div>
                    </div>

                    <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase font-mono block">Inquiries Received</span>
                        <p className="text-xl font-bold text-stone-900">{contactSubmissions.length} Contact Messages</p>
                      </div>
                    </div>

                    <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase font-mono block">Pledges Registered</span>
                        <p className="text-xl font-bold text-stone-900">
                          ₹{donationSubmissions.reduce((sum, item) => sum + item.amount, 0).toLocaleString("en-IN")} Pledged
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tab Navigation sub header */}
                  <div className="flex border-b border-stone-200 gap-4 overflow-x-auto shrink-0 scrollbar-none">
                    {[
                      { id: "blogs", label: `📰 Manage Blog Posts (${blogs.length})` },
                      { id: "gallery", label: `🖼️ Manage Gallery (${dynamicGallery.length > 0 ? dynamicGallery.length : defaultGallery.length})` },
                      { id: "inquiries", label: `📥 Contact Inquiries (${contactSubmissions.length})` },
                      { id: "pledges", label: `💳 Donation Pledges (${donationSubmissions.length})` }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setAdminTab(tab.id)}
                        className={`cursor-pointer whitespace-nowrap text-xs font-bold pb-2 border-b-2 px-1 transition-all ${
                          adminTab === tab.id
                            ? "border-emerald-800 text-emerald-800"
                            : "border-transparent text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Dash View Content */}
                  <div>
                    {adminTab === "blogs" && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Create/Edit form */}
                        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 space-y-4">
                          <h4 className="font-display font-bold text-sm uppercase tracking-wider font-mono text-emerald-800 flex items-center space-x-1">
                            {editingBlogId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            <span>{editingBlogId ? "Modify Blog Article" : "Compose New Article"}</span>
                          </h4>

                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              if (!blogFormTitle || !blogFormAuthor || !blogFormSummary || !blogFormContent) {
                                alert("Please write complete information across all required blog inputs.");
                                return;
                              }

                              const targetDate = blogFormDate || new Date().toLocaleDateString("en-CA");

                              if (editingBlogId) {
                                // EDIT
                                const editedItem = {
                                  id: editingBlogId,
                                  title: blogFormTitle,
                                  category: blogFormCategory,
                                  author: blogFormAuthor,
                                  date: targetDate,
                                  readTime: blogFormReadTime,
                                  coverImage: blogFormCoverImage,
                                  summary: blogFormSummary,
                                  content: blogFormContent
                                };

                                try {
                                  const res = await fetch("/api/blogs", {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(editedItem)
                                  });
                                  if (res.ok) {
                                    const updated = blogs.map((b) => b.id === editingBlogId ? editedItem : b);
                                    saveBlogsToSync(updated);
                                    setEditingBlogId(null);
                                  } else {
                                    alert("Server rejected blog update, updating locally.");
                                    const updated = blogs.map((b) => b.id === editingBlogId ? editedItem : b);
                                    saveBlogsToSync(updated);
                                    setEditingBlogId(null);
                                  }
                                } catch (err) {
                                  console.error("Failed to sync edited blog with server:", err);
                                  alert("Failed to save changes onto server database, updated offline.");
                                  const updated = blogs.map((b) => b.id === editingBlogId ? editedItem : b);
                                  saveBlogsToSync(updated);
                                  setEditingBlogId(null);
                                }
                              } else {
                                // CREATE
                                const newBlog = {
                                  id: `blog-${Date.now()}`,
                                  title: blogFormTitle,
                                  category: blogFormCategory,
                                  author: blogFormAuthor,
                                  date: targetDate,
                                  readTime: blogFormReadTime,
                                  coverImage: blogFormCoverImage,
                                  summary: blogFormSummary,
                                  content: blogFormContent
                                };

                                try {
                                  const res = await fetch("/api/blogs", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(newBlog)
                                  });
                                  if (res.ok) {
                                    saveBlogsToSync([newBlog, ...blogs]);
                                  } else {
                                    alert("Server rejected creating new blog, saving locally.");
                                    saveBlogsToSync([newBlog, ...blogs]);
                                  }
                                } catch (err) {
                                  console.error("Failed to sync new blog with server:", err);
                                  alert("Network connection issue, published onto browser memory.");
                                  saveBlogsToSync([newBlog, ...blogs]);
                                }
                              }

                              // Reset form inputs
                              setBlogFormTitle("");
                              setBlogFormAuthor("");
                              setBlogFormDate("");
                              setBlogFormReadTime("4 min read");
                              setBlogFormCoverImage("soil");
                              setBlogFormSummary("");
                              setBlogFormContent("");
                            }}
                            className="space-y-3.5"
                          >
                            <div>
                              <label className="block text-[9px] font-semibold text-stone-404 text-stone-400 uppercase tracking-widest font-mono">Publication Title *</label>
                              <input
                                type="text"
                                required
                                value={blogFormTitle}
                                onChange={(e) => setBlogFormTitle(e.target.value)}
                                placeholder="Climate resilient crop planning..."
                                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 focus:outline-hidden text-stone-900"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Category *</label>
                                <select
                                  value={blogFormCategory}
                                  onChange={(e: any) => setBlogFormCategory(e.target.value)}
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900"
                                >
                                  <option value="Agriculture">🌾 Agriculture</option>
                                  <option value="Education">🤖 Education</option>
                                  <option value="Women Empowerment">👩🤝👩 Women SHG</option>
                                  <option value="Health">❤️ Health</option>
                                  <option value="Environment">🌱 Environment</option>
                                  <option value="Livelihood">💼 Livelihoods</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Cover Graphic Key</label>
                                <select
                                  value={["soil", "water", "edu", "women", "hero"].includes(blogFormCoverImage) ? blogFormCoverImage : "custom"}
                                  onChange={(e: any) => {
                                    const val = e.target.value;
                                    if (val === "custom") {
                                      setBlogFormCoverImage("https://images.unsplash.com/photo-1592417817098-8f3d6fe1906a?w=800");
                                    } else {
                                      setBlogFormCoverImage(val);
                                    }
                                  }}
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900"
                                >
                                  <option value="soil">Organic Soil Asset</option>
                                  <option value="water">Check Dam Asset</option>
                                  <option value="edu">Computer Lab Asset</option>
                                  <option value="women">Empowered Women Asset</option>
                                  <option value="hero">Green Fields Asset</option>
                                  <option value="custom">Custom Image URL...</option>
                                </select>
                              </div>
                            </div>

                            {!["soil", "water", "edu", "women", "hero"].includes(blogFormCoverImage) && (
                              <div className="mt-3">
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Custom Image URL</label>
                                <input
                                  type="url"
                                  required
                                  value={blogFormCoverImage}
                                  onChange={(e: any) => setBlogFormCoverImage(e.target.value)}
                                  placeholder="https://images.unsplash.com/photo-..."
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 font-mono mt-1"
                                />
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Author Name *</label>
                                <input
                                  type="text"
                                  required
                                  value={blogFormAuthor}
                                  onChange={(e) => setBlogFormAuthor(e.target.value)}
                                  placeholder="Shilpa Patil (Trustee)"
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 focus:outline-hidden text-stone-900"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-404 text-stone-400 uppercase tracking-widest font-mono">Read Time</label>
                                <input
                                  type="text"
                                  value={blogFormReadTime}
                                  onChange={(e) => setBlogFormReadTime(e.target.value)}
                                  placeholder="4 min read"
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 focus:outline-hidden text-stone-900"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1">
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Custom Publication Date</label>
                                <input
                                  type="date"
                                  value={blogFormDate}
                                  onChange={(e) => setBlogFormDate(e.target.value)}
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 focus:outline-hidden text-stone-900"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Short Summary Details *</label>
                              <textarea
                                required
                                rows={2}
                                value={blogFormSummary}
                                onChange={(e) => setBlogFormSummary(e.target.value)}
                                placeholder="Brief overview shown on the blog feed grid..."
                                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 focus:outline-hidden text-stone-900 opacity-90"
                              />
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="block text-[9px] font-semibold text-stone-404 text-stone-400 uppercase tracking-widest font-mono">Full Body Content *</label>
                                <span className="text-[8px] text-stone-400 font-mono font-bold">Use ### for subheadings</span>
                              </div>
                              <textarea
                                required
                                rows={6}
                                value={blogFormContent}
                                onChange={(e) => setBlogFormContent(e.target.value)}
                                placeholder="### Enter detailed section headline&#10;&#10;Write continuous educational, environmental, or administrative text profiles here..."
                                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 focus:outline-hidden font-mono text-stone-900"
                              />
                            </div>

                            <div className="flex space-x-2.5 pt-1">
                              <button
                                type="submit"
                                className="cursor-pointer flex-1 bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-2.5 rounded-lg text-center"
                              >
                                {editingBlogId ? "Save Article Tweaks" : "Publish to Main Website"}
                              </button>
                              {editingBlogId && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingBlogId(null);
                                    setBlogFormTitle("");
                                    setBlogFormAuthor("");
                                    setBlogFormDate("");
                                    setBlogFormReadTime("4 min read");
                                    setBlogFormCoverImage("soil");
                                    setBlogFormSummary("");
                                    setBlogFormContent("");
                                  }}
                                  className="cursor-pointer border border-stone-300 text-stone-700 px-3 rounded-lg text-xs font-bold"
                                >
                                  Cancel Edit
                                </button>
                              )}
                            </div>
                          </form>
                        </div>

                        {/* List of current blogs */}
                        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 space-y-4">
                          <h4 className="font-display font-bold text-stone-900 text-sm uppercase tracking-wider font-mono">
                            Live Registered Feed ({blogs.length} articles)
                          </h4>

                          <div className="divide-y divide-stone-100 max-h-[50vh] overflow-y-auto pr-2 space-y-2">
                            {blogs.map((blog) => (
                              <div key={blog.id} className="py-3 flex items-start justify-between gap-4 first:pt-0">
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-[9px] uppercase font-bold text-emerald-800 bg-emerald-50 px-1.5 rounded font-mono border border-emerald-100 py-0.5">
                                      {blog.category}
                                    </span>
                                    <span className="text-[9px] font-medium text-stone-400 font-mono">{blog.date}</span>
                                  </div>
                                  <p className="text-xs font-bold text-stone-900 leading-tight line-clamp-2">{blog.title}</p>
                                  <p className="text-[10px] text-stone-500 line-clamp-1">Author: {blog.author}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 shrink-0 self-center">
                                  <button
                                    onClick={() => {
                                      setEditingBlogId(blog.id);
                                      setBlogFormTitle(blog.title);
                                      setBlogFormCategory(blog.category);
                                      setBlogFormAuthor(blog.author);
                                      setBlogFormDate(blog.date);
                                      setBlogFormReadTime(blog.readTime);
                                      setBlogFormCoverImage(blog.coverImage);
                                      setBlogFormSummary(blog.summary);
                                      setBlogFormContent(blog.content);
                                    }}
                                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                                    title="Edit Article"
                                  >
                                    <Edit className="w-3.5 h-3.5 shrink-0" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Do you wish to permanently remove the article titled "${blog.title}"?`)) {
                                        try {
                                          const res = await fetch(`/api/blogs?id=${blog.id}`, {
                                            method: "DELETE",
                                          });
                                          if (res.ok) {
                                            const updated = blogs.filter((b) => b.id !== blog.id);
                                            saveBlogsToSync(updated);
                                            if (editingBlogId === blog.id) setEditingBlogId(null);
                                          } else {
                                            alert("Server rejected the deletion request.");
                                          }
                                        } catch (err) {
                                          console.error("Failed to delete blog on server:", err);
                                          alert("Failed to sync deletion with server. Deleting locally offline.");
                                          const updated = blogs.filter((b) => b.id !== blog.id);
                                          saveBlogsToSync(updated);
                                          if (editingBlogId === blog.id) setEditingBlogId(null);
                                        }
                                      }
                                    }}
                                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                                    title="Delete Article"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 shrink-0" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {adminTab === "gallery" && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Gallery Item Form */}
                        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 space-y-4">
                          <h4 className="font-display font-bold text-sm uppercase tracking-wider font-mono text-emerald-800 flex items-center space-x-1">
                            {editingGalleryId ? <Edit className="w-4 h-4 text-amber-500" /> : <Plus className="w-4 h-4" />}
                            <span>{editingGalleryId ? "Modify Gallery Media" : "Add New Media Profile"}</span>
                          </h4>

                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              if (!galleryFormTitle || !galleryFormDescription || !galleryFormLocation) {
                                alert("Please write complete information across all required fields.");
                                return;
                              }

                              const payloadItem: GalleryItem = {
                                id: editingGalleryId || `gal-${Date.now()}`,
                                title: galleryFormTitle,
                                category: galleryFormCategory as any,
                                description: galleryFormDescription,
                                location: galleryFormLocation,
                                type: galleryFormType,
                                image: galleryFormImage,
                                ...(galleryFormType === "video" ? { videoUrl: galleryFormVideoUrl } : {})
                              };

                              if (editingGalleryId) {
                                // UPDATE (PUT)
                                try {
                                  const res = await fetch("/api/gallery", {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(payloadItem)
                                  });
                                  if (res.ok) {
                                    const updated = (dynamicGallery.length > 0 ? dynamicGallery : defaultGallery).map((g) => g.id === editingGalleryId ? payloadItem : g);
                                    saveGalleryToSync(updated);
                                    setEditingGalleryId(null);
                                    // Reset form
                                    setGalleryFormTitle("");
                                    setGalleryFormDescription("");
                                    setGalleryFormLocation("");
                                    setGalleryFormType("image");
                                    setGalleryFormImage("soil");
                                    setGalleryFormVideoUrl("");
                                  } else {
                                    alert("Server rejected gallery update, updating locally.");
                                    const updated = (dynamicGallery.length > 0 ? dynamicGallery : defaultGallery).map((g) => g.id === editingGalleryId ? payloadItem : g);
                                    saveGalleryToSync(updated);
                                    setEditingGalleryId(null);
                                  }
                                } catch (err) {
                                  console.error("Failed to sync edited gallery item:", err);
                                  alert("Failed to sync with server, updated locally.");
                                  const updated = (dynamicGallery.length > 0 ? dynamicGallery : defaultGallery).map((g) => g.id === editingGalleryId ? payloadItem : g);
                                  saveGalleryToSync(updated);
                                  setEditingGalleryId(null);
                                }
                              } else {
                                // CREATE (POST)
                                try {
                                  const res = await fetch("/api/gallery", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(payloadItem)
                                  });
                                  if (res.ok) {
                                    const currentGallery = (dynamicGallery.length > 0 ? dynamicGallery : defaultGallery);
                                    const updated = [payloadItem, ...currentGallery];
                                    saveGalleryToSync(updated);
                                    // Reset form
                                    setGalleryFormTitle("");
                                    setGalleryFormDescription("");
                                    setGalleryFormLocation("");
                                    setGalleryFormType("image");
                                    setGalleryFormImage("soil");
                                    setGalleryFormVideoUrl("");
                                  } else {
                                    alert("Server rejected new gallery item, saving locally.");
                                    const currentGallery = (dynamicGallery.length > 0 ? dynamicGallery : defaultGallery);
                                    const updated = [payloadItem, ...currentGallery];
                                    saveGalleryToSync(updated);
                                  }
                                } catch (err) {
                                  console.error("Failed to post new gallery item:", err);
                                  alert("Failed to save to server, saved locally.");
                                  const currentGallery = (dynamicGallery.length > 0 ? dynamicGallery : defaultGallery);
                                  const updated = [payloadItem, ...currentGallery];
                                  saveGalleryToSync(updated);
                                }
                              }
                            }}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Media Dynamic Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={galleryFormTitle}
                                  onChange={(e) => setGalleryFormTitle(e.target.value)}
                                  placeholder="E.g., Sustainable Drip Irrigation Demo"
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-emerald-800 focus:outline-hidden"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Category Focus *</label>
                                <select
                                  value={galleryFormCategory}
                                  onChange={(e) => setGalleryFormCategory(e.target.value)}
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-emerald-800 focus:outline-hidden"
                                >
                                  <option value="agriculture">🌾 Agriculture Focus</option>
                                  <option value="education">🤖 Rural Education</option>
                                  <option value="women">👩🤝👩 Women SHG</option>
                                  <option value="environment">🌱 Environment protection</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">District Location *</label>
                                <input
                                  type="text"
                                  required
                                  value={galleryFormLocation}
                                  onChange={(e) => setGalleryFormLocation(e.target.value)}
                                  placeholder="E.g., Hubli Rural, Dharwad"
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-emerald-800 focus:outline-hidden"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Media Dimension *</label>
                                <select
                                  value={galleryFormType}
                                  onChange={(e: any) => setGalleryFormType(e.target.value)}
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 font-mono focus:ring-1 focus:ring-emerald-800 focus:outline-hidden"
                                >
                                  <option value="image">Still Graphic (Image)</option>
                                  <option value="video">Interactive Footage (Video)</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Thumbnail Asset</label>
                                <select
                                  value={["soil", "water", "edu", "women", "hero"].includes(galleryFormImage) ? galleryFormImage : "custom"}
                                  onChange={(e: any) => {
                                    const val = e.target.value;
                                    if (val === "custom") {
                                      setGalleryFormImage("https://images.unsplash.com/photo-1592417817098-8f3d6fe1906a?w=800");
                                    } else {
                                      setGalleryFormImage(val);
                                    }
                                  }}
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-emerald-800 focus:outline-hidden"
                                >
                                  <option value="soil">Organic Soil Asset</option>
                                  <option value="water">Rainwater harvesting dam</option>
                                  <option value="edu">Computer Lab Asset</option>
                                  <option value="women">Empowered Women Asset</option>
                                  <option value="hero">Green Fields Asset</option>
                                  <option value="custom">Custom Image URL...</option>
                                </select>
                              </div>
                            </div>

                            {!["soil", "water", "edu", "women", "hero"].includes(galleryFormImage) && (
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Custom Image Thumbnail URL</label>
                                <input
                                  type="url"
                                  required
                                  value={galleryFormImage}
                                  onChange={(e) => setGalleryFormImage(e.target.value)}
                                  placeholder="https://images.unsplash.com/photo-..."
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 font-mono focus:ring-1 focus:ring-emerald-800 focus:outline-hidden"
                                />
                              </div>
                            )}

                            {galleryFormType === "video" && (
                              <div>
                                <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Video Link (YouTube/Direct video mp4 link) *</label>
                                <input
                                  type="url"
                                  required
                                  value={galleryFormVideoUrl}
                                  onChange={(e) => setGalleryFormVideoUrl(e.target.value)}
                                  placeholder="https://www.youtube.com/watch?v=..."
                                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 font-mono focus:ring-1 focus:ring-emerald-800 focus:outline-hidden"
                                />
                              </div>
                            )}

                            <div>
                              <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest font-mono">Short Description Details *</label>
                              <textarea
                                required
                                rows={3}
                                value={galleryFormDescription}
                                onChange={(e) => setGalleryFormDescription(e.target.value)}
                                placeholder="Summary explanation shown when viewers explore the item..."
                                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-emerald-800 focus:outline-hidden"
                              />
                            </div>

                            <div className="flex space-x-2.5 pt-1">
                              <button
                                type="submit"
                                className="cursor-pointer flex-1 bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-2.5 rounded-lg text-center transition-all shadow-xs"
                              >
                                {editingGalleryId ? "Save Media Tweaks" : "Upload to Live Gallery"}
                              </button>
                              {editingGalleryId && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingGalleryId(null);
                                    setGalleryFormTitle("");
                                    setGalleryFormDescription("");
                                    setGalleryFormLocation("");
                                    setGalleryFormType("image");
                                    setGalleryFormImage("soil");
                                    setGalleryFormVideoUrl("");
                                  }}
                                  className="cursor-pointer border border-stone-300 hover:bg-stone-55 text-stone-700 px-3 rounded-lg text-xs font-bold transition-all"
                                >
                                  Cancel Edit
                                </button>
                              )}
                            </div>
                          </form>
                        </div>

                        {/* Gallery Items List */}
                        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 space-y-4">
                          <h4 className="font-display font-bold text-stone-900 text-sm uppercase tracking-wider font-mono">
                            Live Gallery Archive ({(dynamicGallery.length > 0 ? dynamicGallery : defaultGallery).length} Items)
                          </h4>

                          <div className="divide-y divide-stone-100 max-h-[50vh] overflow-y-auto pr-2 space-y-3">
                            {(dynamicGallery.length > 0 ? dynamicGallery : defaultGallery).map((item) => (
                              <div key={item.id} className="py-3 flex items-center justify-between gap-4 first:pt-0">
                                <div className="flex items-center space-x-3 min-w-0">
                                  {/* Small preview block */}
                                  <div className="relative w-12 h-12 rounded-lg bg-stone-100 overflow-hidden border border-stone-200/60 shrink-0">
                                    <img
                                      src={
                                        ["soil", "water", "edu", "women", "hero"].includes(item.image)
                                          ? getCoverImageAsset(item.image).src
                                          : item.image
                                      }
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                    {item.type === "video" && (
                                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <Play className="w-4 h-4 text-white" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-0.5 min-w-0">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-[9px] uppercase font-bold text-emerald-805 text-emerald-800 bg-emerald-50 px-1.5 rounded font-mono border border-emerald-100 py-0.5 whitespace-nowrap">
                                        {item.category}
                                      </span>
                                      <span className="text-[9px] font-medium text-stone-400 font-mono truncate">{item.location}</span>
                                    </div>
                                    <p className="text-xs font-bold text-stone-900 leading-tight truncate">{item.title}</p>
                                    <p className="text-[10px] text-stone-500 line-clamp-1">{item.description}</p>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                                  <button
                                    onClick={() => {
                                      setEditingGalleryId(item.id);
                                      setGalleryFormTitle(item.title);
                                      setGalleryFormCategory(item.category);
                                      setGalleryFormDescription(item.description);
                                      setGalleryFormLocation(item.location);
                                      setGalleryFormType(item.type || "image");
                                      setGalleryFormImage(item.image);
                                      setGalleryFormVideoUrl(item.videoUrl || "");
                                    }}
                                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                                    title="Edit Gallery Item"
                                  >
                                    <Edit className="w-3.5 h-3.5 shrink-0" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Do you wish to permanently remove the gallery item titled "${item.title}"?`)) {
                                        try {
                                          const res = await fetch(`/api/gallery?id=${item.id}`, {
                                            method: "DELETE",
                                          });
                                          if (res.ok) {
                                            const updated = (dynamicGallery.length > 0 ? dynamicGallery : defaultGallery).filter((g) => g.id !== item.id);
                                            saveGalleryToSync(updated);
                                            if (editingGalleryId === item.id) setEditingGalleryId(null);
                                          } else {
                                            alert("Server rejected the deletion request.");
                                          }
                                        } catch (err) {
                                          console.error("Failed to delete gallery item on server:", err);
                                          alert("Failed to sync deletion with server. Deleting locally offline.");
                                          const updated = (dynamicGallery.length > 0 ? dynamicGallery : defaultGallery).filter((g) => g.id !== item.id);
                                          saveGalleryToSync(updated);
                                          if (editingGalleryId === item.id) setEditingGalleryId(null);
                                        }
                                      }
                                    }}
                                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                                    title="Delete Gallery Item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 shrink-0" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {adminTab === "inquiries" && (
                      <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-display font-black text-stone-900 text-sm uppercase tracking-wider font-mono">
                            Live Contact Inquiries Log Book
                          </h4>
                          <span className="text-xs bg-stone-105 bg-stone-100 px-3 py-1 rounded-full font-mono font-bold text-stone-600 font-sans">
                            {contactSubmissions.length} records retrieved
                          </span>
                        </div>

                        {contactSubmissions.length === 0 ? (
                          <div className="text-center py-12 text-stone-500 text-xs">
                            <Mail className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-50" />
                            <p className="font-semibold">No contact inquiries recorded yet.</p>
                            <p className="text-[10px] text-stone-400 mt-1">Submit the public contact form to view real entries instantly.</p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-stone-200 text-stone-400 font-mono text-[10px] uppercase">
                                  <th className="pb-3 font-bold">Inquirer Coordinates</th>
                                  <th className="pb-3 font-bold">Subject Type</th>
                                  <th className="pb-3 font-bold">Message Details</th>
                                  <th className="pb-3 font-bold">Received Date</th>
                                  <th className="pb-3 text-right font-bold w-16">Wipe</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-stone-100">
                                {contactSubmissions.map((inq, idx) => (
                                  <tr key={inq.id || idx} className="hover:bg-stone-50/50">
                                    <td className="py-3 pr-4">
                                      <p className="font-bold text-stone-900">{inq.name}</p>
                                      <p className="text-[10px] text-stone-400">{inq.email}</p>
                                      <p className="text-[10px] text-emerald-800 font-mono mt-0.5">{inq.phone}</p>
                                    </td>
                                    <td className="py-3 pr-4">
                                      <span className="bg-emerald-50 text-emerald-900 font-semibold px-2 py-0.5 rounded border border-emerald-100 text-[10px]">
                                        {inq.subject}
                                      </span>
                                    </td>
                                    <td className="py-3 pr-4 max-w-sm">
                                      <p className="text-stone-605 text-stone-600 line-clamp-3 leading-relaxed whitespace-pre-wrap">{inq.message}</p>
                                    </td>
                                    <td className="py-3 pr-4 font-mono text-[10px] text-stone-500 whitespace-nowrap">
                                      {inq.date}
                                    </td>
                                    <td className="py-3 text-right">
                                      <button
                                        onClick={() => {
                                          if (confirm("Wipe this inquiry?")) {
                                            const updated = contactSubmissions.filter((_, i) => i !== idx);
                                            setContactSubmissions(updated);
                                            localStorage.setItem("raitamitra_inquiries", JSON.stringify(updated));
                                          }
                                        }}
                                        className="text-stone-400 hover:text-red-600 p-1 rounded hover:bg-red-50 cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                    {adminTab === "pledges" && (
                      <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-display font-black text-stone-950 text-sm uppercase tracking-wider font-mono">
                            Live Tax-Exempt Pledges Ledger Book (Section 80G)
                          </h4>
                          <span className="text-xs bg-stone-100 px-3 py-1 rounded-full font-mono font-bold text-stone-600">
                            {donationSubmissions.length} receipt records
                          </span>
                        </div>

                        {donationSubmissions.length === 0 ? (
                          <div className="text-center py-12 text-stone-500 text-xs">
                            <Sparkles className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-50" />
                            <p className="font-semibold">No donation pledges recorded yet.</p>
                            <p className="text-[10px] text-stone-400 mt-1">Submit the public impact donation sliding-block form to populate.</p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs font-sans">
                              <thead>
                                <tr className="border-b border-stone-200 text-stone-404 text-stone-400 font-mono text-[11px] uppercase">
                                  <th className="pb-3 font-bold">Donor Coordinates</th>
                                  <th className="pb-3 font-bold text-right font-sans">Contributed (INR)</th>
                                  <th className="pb-3 font-bold font-mono">80G Receipt Number</th>
                                  <th className="pb-3 font-bold">Registered Date</th>
                                  <th className="pb-3 text-right font-bold w-16">Wipe</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-stone-100 font-sans">
                                {donationSubmissions.map((plg, idx) => (
                                  <tr key={plg.id || idx} className="hover:bg-stone-50/50">
                                    <td className="py-3 pr-4">
                                      <p className="font-bold text-stone-900 uppercase">{plg.donorName}</p>
                                      <p className="text-[10px] text-stone-400">{plg.email}</p>
                                      <div className="flex space-x-3 text-[10px] text-stone-500 font-mono mt-0.5">
                                        <span>Mobile: {plg.phone}</span>
                                        <span>•</span>
                                        <span className="text-amber-600">PAN: {plg.donorPan || "DECLINED"}</span>
                                      </div>
                                    </td>
                                    <td className="py-3 pr-4 text-right font-bold text-emerald-800 font-mono text-xs whitespace-nowrap">
                                      ₹{plg.amount.toLocaleString("en-IN")}.00
                                    </td>
                                    <td className="py-3 pr-4 font-mono font-semibold text-stone-700 text-[11px]">
                                      {plg.receiptNumber}
                                    </td>
                                    <td className="py-3 pr-4 text-stone-500 font-mono text-[10px] whitespace-nowrap">
                                      {plg.date}
                                    </td>
                                    <td className="py-3 text-right">
                                      <button
                                        onClick={() => {
                                          if (confirm("Wipe this ledger history row?")) {
                                            const updated = donationSubmissions.filter((_, i) => i !== idx);
                                            setDonationSubmissions(updated);
                                            localStorage.setItem("raitamitra_pledges", JSON.stringify(updated));
                                          }
                                        }}
                                        className="text-stone-400 hover:text-red-650 p-1 rounded hover:bg-red-50 cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>

            {/* Sticky Admin footer bar */}
            <div className="p-4 bg-stone-900 border-t border-stone-850 flex items-center justify-between text-[11px] text-stone-400 shrink-0">
              <span className="font-mono font-bold text-emerald-500">NGO DARPAN Registry Status: KA/2023/0342549</span>
              {isAdminLoggedIn ? (
                <button
                  onClick={() => {
                    setIsAdminLoggedIn(false);
                    setAdminPasskey("");
                    setEditingBlogId(null);
                  }}
                  className="cursor-pointer font-bold text-amber-400 hover:text-amber-500 flex items-center space-x-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out of Console</span>
                </button>
              ) : (
                <span className="text-amber-400">Secure Passkey Required</span>
              )}
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
