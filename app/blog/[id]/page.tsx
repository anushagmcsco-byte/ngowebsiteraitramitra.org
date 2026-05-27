import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogsFromServer } from "@/lib/blogs-server";
import { getCoverImageAsset } from "@/lib/blogs";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Heart,
  Sparkles,
  Leaf,
  MapPin,
  Mail,
  Phone,
  Building,
  CheckCircle2
} from "lucide-react";

// Force Next.js to render this route on demand (dynamic vs static compile)
export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  
  // Retrieve the latest server-side database posts
  const blogs = getBlogsFromServer();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    // Graceful fallback if article is not found
    return notFound();
  }

  // Choose styling accents based on blog category
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Agriculture":
        return { bg: "bg-emerald-50 text-emerald-800 border-emerald-100", accent: "text-emerald-700" };
      case "Education":
        return { bg: "bg-blue-50 text-blue-800 border-blue-100", accent: "text-blue-700" };
      case "Women Empowerment":
        return { bg: "bg-amber-50 text-amber-800 border-amber-100", accent: "text-amber-700" };
      case "Health":
        return { bg: "bg-red-50 text-red-800 border-red-100", accent: "text-red-700" };
      case "Environment":
        return { bg: "bg-teal-50 text-teal-800 border-teal-100", accent: "text-teal-700" };
      default:
        return { bg: "bg-stone-100 text-stone-800 border-stone-200", accent: "text-stone-700" };
    }
  };

  const catStyle = getCategoryStyles(blog.category);
  const coverAsset = getCoverImageAsset(blog.coverImage);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-emerald-150 selection:text-emerald-900">
      
      {/* Editorial Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="font-display font-black text-xs sm:text-sm tracking-tight text-stone-900 uppercase">
              Raita Mitra <span className="text-emerald-800">Social Trust</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#blog"
              className="text-xs font-bold text-emerald-800 border-b-2 border-emerald-800 pb-0.5"
            >
              Editorial Feed
            </Link>
            <Link
              href="/#contact"
              className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
            >
              Reach Office
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/#blog"
            className="inline-flex items-center space-x-2 text-xs font-bold text-stone-500 hover:text-emerald-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Raita Mitra Feed</span>
          </Link>
        </div>

        {/* Content Block */}
        <article className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs">
          
          {/* Header Title Metadata */}
          <div className="p-6 sm:p-10 border-b border-stone-100 space-y-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-extrabold uppercase font-mono tracking-widest px-2.5 py-1 rounded-full border ${catStyle.bg}`}>
                {blog.category}
              </span>
              <span className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                Official Report
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {blog.title}
            </h1>

            {/* Author and Date Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs text-stone-500 font-medium">
              <div className="flex items-center space-x-1.5 border-r border-stone-200 pr-4">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs ring-4 ring-emerald-50">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-stone-850 text-stone-800">{blog.author}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-stone-400 border-r border-stone-200 pr-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-stone-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{blog.readTime}</span>
              </div>
            </div>

          </div>

          {/* Hero Banner Image */}
          <div className="relative h-64 sm:h-96 w-full bg-stone-100 flex items-center justify-center overflow-hidden">
            <Image
              src={coverAsset}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Editorial Content Text */}
          <div className="p-6 sm:p-10 space-y-6">
            
            <p className="text-stone-500 text-sm font-semibold italic border-l-4 border-emerald-600 pl-4 py-1 leading-relaxed">
              {blog.summary}
            </p>

            {/* Content Formatted Body Text (Synthesized HTML) */}
            <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-5 font-sans whitespace-pre-wrap">
              {blog.content.split("\n\n").map((para, i) => {
                if (para.startsWith("### ")) {
                  return (
                    <h3 key={i} className="font-display text-lg sm:text-2xl font-extrabold text-stone-900 pt-5 leading-tight">
                      {para.replace("### ", "")}
                    </h3>
                  );
                } else if (para.startsWith("#### ")) {
                  return (
                    <h4 key={i} className="font-sans text-xs uppercase font-extrabold tracking-widest text-emerald-850 pt-3 font-mono">
                      {para.replace("#### ", "")}
                    </h4>
                  );
                } else if (para.startsWith("* ") || para.startsWith("- ")) {
                  const listItems = para.split("\n").map((li) => li.replace(/^[-*]\s+/, ""));
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2 text-stone-600 my-4">
                      {listItems.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  );
                } else if (para.match(/^\d+\.\s/)) {
                  const listItems = para.split("\n").map((li) => li.replace(/^\d+\.\s+/, ""));
                  return (
                    <ol key={i} className="list-decimal pl-6 space-y-2 text-stone-600 my-4">
                      {listItems.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base leading-relaxed">{item}</li>
                      ))}
                    </ol>
                  );
                }
                return <p key={i} className="leading-relaxed text-stone-650">{para}</p>;
              })}
            </div>

            {/* Bottom Support Callout CTA Banner */}
            <div className="mt-12 p-6 sm:p-8 bg-stone-900 text-white rounded-2xl relative overflow-hidden ring-1 ring-white/10 shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12" />
              
              <div className="space-y-4 max-w-xl position-relative z-10">
                <span className="text-[10px] font-bold text-amber-400 font-mono uppercase tracking-widest flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sponsorship & Rural Engagement</span>
                </span>
                
                <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                  Support Our Groundwork in {blog.category}
                </h3>
                
                <p className="text-xs text-stone-400 leading-relaxed">
                  Every training workbook, farm compost-kit, and computer terminal is made possible by proactive public sponsors. Submit an 80G tax-exempt pledge to coordinate direct impact.
                </p>

                <div className="pt-2">
                  <Link
                    href="/#donate-form-anchor"
                    className="cursor-pointer inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white text-xs font-bold py-2.5 px-5 rounded-lg active:scale-98 shadow-sm"
                  >
                    <span>Sponsor Grassroots Action</span>
                    <Leaf className="w-3.5 h-3.5 text-emerald-200" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </article>

      </main>

      {/* Shared Footer Area */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-16 mt-20 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
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

            <div>
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono mb-4">Quick Links</h4>
              <ul className="text-xs space-y-2.5">
                <li><Link href="/#about" className="hover:text-amber-400 transition-colors">About Our Trust</Link></li>
                <li><Link href="/#focus-areas" className="hover:text-amber-400 transition-colors">Primary Focus Areas</Link></li>
                <li><Link href="/#compliance" className="hover:text-amber-400 transition-colors">Statutory Compliance</Link></li>
                <li><Link href="/#impact" className="hover:text-amber-400 transition-colors">Impact Pricing Calculator</Link></li>
                <li><Link href="/#contact" className="hover:text-amber-400 transition-colors">Reach Hubballi Office</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono mb-4">Operational Area</h4>
              <p className="text-xs leading-relaxed text-stone-500 mb-3">
                Expanding rural programs across multiple districts of Karnataka:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Dharwad", "Belagavi", "Haveri", "Raichur", "Koppal", "Hubballi"].map((d, i) => (
                  <span key={i} className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded border border-stone-700/60 font-medium">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono mb-4">Coordinates</h4>
              <div className="text-xs leading-relaxed space-y-1">
                <p className="font-semibold text-stone-300">Registered Office:</p>
                <p className="text-stone-500">Pride Icon, Gokul Road, Hubballi</p>
                <div className="pt-2">
                  <a href="mailto:raitamitrasocialtrust@gmail.com" className="text-emerald-500 hover:underline block">raitamitrasocialtrust@gmail.com</a>
                  <a href="tel:+917676376221" className="text-stone-350 hover:underline block mt-0.5">+91 7676376221</a>
                </div>
              </div>
            </div>

          </div>

          <hr className="border-stone-800 my-8" />

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

    </div>
  );
}
