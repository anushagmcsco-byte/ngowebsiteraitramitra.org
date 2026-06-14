import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Sprout,
  Users,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Heart,
  ShieldCheck,
  Award,
  Briefcase,
  Leaf,
  Calendar,
  Clock,
  MapPin,
  Building,
  Phone,
  Mail,
  ChevronRight
} from "lucide-react";
import { getBlogsFromServer } from "@/lib/blogs-server";
import { getCoverImageAsset } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Raita Mitra Social Trust (R) | Empowering Farmers & Rural Communities",
  description: "Official portal of Raita Mitra Social Trust. We empower farmers, women Self-Help Groups, and rural students through organic agriculture, digital learning, and welfare advocacy in Hubballi, Karnataka.",
  openGraph: {
    title: "Raita Mitra Social Trust (R) | Empowering Farmers & Rural Communities",
    description: "Official portal of Raita Mitra Social Trust. We empower farmers, women Self-Help Groups, and rural students through organic agriculture, digital learning, and welfare advocacy in Hubballi, Karnataka.",
    images: [
      {
        url: "https://picsum.photos/seed/raitamitra-home-seo/1200/630",
        width: 1200,
        height: 630,
        alt: "Empowering Farmers & Rural Communities"
      }
    ]
  }
};

// Force Next.js to render this route dynamically on demand
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // SSR loading of the latest editorial posts
  const recentBlogs = getBlogsFromServer().slice(0, 3);

  // Focus Area snippets
  const pillars = [
    {
      title: "Sustainable Agriculture",
      emoji: "🌾",
      desc: "Recharging chemical-free organic carbon soil beds & capacity training.",
      href: "/our-focus?tab=agriculture"
    },
    {
      title: "Women Empowerment",
      emoji: "👩🤝👩",
      desc: "Establishing micro-credit and crafts entrepreneurship for Self-Help Groups (SHGs).",
      href: "/our-focus?tab=women"
    },
    {
      title: "Digital & AI Education",
      emoji: "🤖",
      desc: "Deploying workspace computers and coding workshops to public rural state schools.",
      href: "/our-focus?tab=education"
    }
  ];

  return (
    <div className="min-h-screen text-stone-900 bg-stone-50/10">
      
      {/* 1. Dynamic Hero Presentation */}
      <section className="relative bg-emerald-950 text-white py-24 sm:py-32 overflow-hidden flex items-center justify-center border-b border-stone-200">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://picsum.photos/seed/karnataka-fields/1920/1080"
            alt="Lush green paddy croplands of Karnataka"
            fill
            className="object-cover scale-102"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-800/60 border border-emerald-700/60 rounded-full px-4 py-1.5 text-xs text-emerald-200 backdrop-blur-xs font-mono font-bold">
            <Sprout className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Registered Public Charitable Trust</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-5xl mx-auto">
            Empowering Farmers, <br className="hidden sm:block" />
            <span className="text-amber-400">Strengthening Rural Livelihoods</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Raita Mitra Social Trust dedicates practical, transparent grassroots programs to advance organic farming biochemistry, high-school computers access, maternal healthcare, and women&apos;s financial inclusion across Karnataka.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
            <Link
              href="/impact"
              className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl text-stone-950 bg-amber-400 hover:bg-amber-500 transition-all font-sans active:scale-98 shadow-md"
            >
              <span>Calculate Donation Impact</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/our-focus"
              className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-mono"
            >
              <span>Explore 6 Focus Sectors</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Three Columns Core Foundations Bento */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono">Grassroots Action</span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-stone-950 mt-1">
            Our Central Pillars of Action
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <span className="text-3xl">{p.emoji}</span>
                <h3 className="font-display text-base font-extrabold text-stone-950">{p.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{p.desc}</p>
              </div>

              <Link
                href={p.href}
                className="mt-6 text-xs font-bold text-emerald-850 hover:text-emerald-950 inline-flex items-center space-x-1.5"
              >
                <span>Read details</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Section highlighting About Story */}
      <section className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-xs border border-stone-200">
            <Image
              src="https://picsum.photos/seed/karnataka-women/800/1000"
              alt="Rural collectives gather in community councils"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono block">
              Audited & Compliant Public Institution
            </span>
            
            <h2 className="font-display text-3xl sm:text-4xl font-black text-stone-950 tracking-tight leading-tight">
              A public initiative rooted in transparency and community trust
            </h2>

            <p className="text-sm text-stone-605 leading-relaxed max-w-xl">
              Raita Mitra Social Trust was formed in **Hubballi, Karnataka** under the Indian Trusts Act, 1882. Guided by social policy experts and agronomists, our mission focuses entirely on direct material and intellectual development of smallholders, rural student populations, and Self-Help Groups.
            </p>

            <div className="grid grid-cols-2 gap-4 pb-2">
              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-stone-750">80G Provisional exemption</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-stone-750">NGO Darpan: KA/2023/0342549</span>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 py-3 px-6 bg-stone-900 whitespace-nowrap text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-stone-850 shadow-xs transition-all"
            >
              <span>About Trust Board</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Publications Section Highlight Preview */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase font-mono block">Publications Feed</span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                Latest Agrarian Guides & Press Reads
              </h2>
            </div>

            <Link
              href="/blog"
              className="text-xs font-bold text-emerald-850 hover:text-emerald-950 inline-flex items-center space-x-1"
            >
              <span>Explore all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogs.map((b) => {
              const coverImg = getCoverImageAsset(b.coverImage);
              return (
                <article
                  key={b.id}
                  className="bg-stone-50/50 border border-stone-200 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between hover:shadow-xs transition-all"
                >
                  <div>
                    <div className="relative h-44 w-full bg-stone-100">
                      <Image
                        src={coverImg.src}
                        alt={b.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[9px] font-extrabold uppercase font-mono px-2.5 py-0.5 rounded-full">
                        {b.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex gap-2 text-[9px] font-mono font-bold text-stone-400">
                        <span>{b.date}</span>
                        <span>•</span>
                        <span>{b.readTime}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-stone-950 hover:text-emerald-800 text-base line-clamp-2 leading-tight">
                        {b.title}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                        {b.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-stone-200/40 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 font-bold font-mono">By {b.author.split(" (")[0]}</span>
                    <Link
                      href={`/blog/${b.id}`}
                      className="cursor-pointer text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center space-x-1"
                    >
                      <span>Read Publication</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Contact & Support Callouts Container */}
      <section className="py-20 bg-stone-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Tax Saving widget banner */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="font-mono text-[9px] font-extrabold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded">
              PLEDGE CALCULATOR
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-stone-950 tracking-tight leading-tight">
              Exempt net domestic taxable income up to 50%
            </h3>
            <p className="text-xs sm:text-sm text-stone-550 leading-relaxed max-w-xl">
              Domestic philanthropists can claim immediate tax benefits with provisional Section 80G tax certifications dynamically simulated inside our database calculator. Try out different levels instantly.
            </p>
          </div>

          <Link
            href="/impact"
            className="cursor-pointer inline-flex justify-center items-center w-full sm:w-auto py-3 px-6 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all"
          >
            <span>Run Impact Calculator</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Address and telephone box helpdesk */}
        <div className="lg:col-span-5 bg-stone-900 text-stone-300 p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden border border-stone-850">
          <div className="space-y-5">
            <h4 className="text-white font-display text-base font-bold">Location & Address Desk</h4>
            <div className="space-y-4 text-xs text-stone-400">
              <p className="leading-relaxed">
                <span className="font-bold text-white block">Registered Address Headquarters:</span>
                Pride Icon, Gokul Road, Hubballi, Karnataka - 580030
              </p>
              <p className="leading-relaxed">
                <span className="font-bold text-white block">Official Support Helpline:</span>
                +91 76763 76221
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="cursor-pointer inline-flex justify-center items-center py-3 px-5 border border-white/20 hover:bg-white/5 rounded-xl text-white text-xs font-semibold font-mono mt-6"
          >
            <span>Transmit Inquiry Message</span>
          </Link>
        </div>

      </section>

    </div>
  );
}
