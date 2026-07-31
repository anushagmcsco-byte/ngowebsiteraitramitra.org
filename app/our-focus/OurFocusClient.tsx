"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Sprout,
  Users,
  GraduationCap,
  Heart,
  Leaf,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useLayout } from "@/components/LayoutShell";

// Fallback images
import heroImg from "../../src/assets/images/karnataka_farmer_hero_1779872061305.png";
import eduImg from "../../src/assets/images/rural_digital_education_1779872087959.png";
import womenImg from "../../src/assets/images/women_empowerment_1779872106993.png";
import soilImg from "../../src/assets/images/soil_workshop_1779872711266.png";

export default function OurFocusPage() {
  const { openDonateModal } = useLayout();
  const [activeTab, setActiveTab] = useState<string>("agriculture");

  const focusAreas = [
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
      image: heroImg
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
      image: womenImg
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
      image: eduImg
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
      image: heroImg
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
      image: heroImg
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
      image: womenImg
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-24">
      {/* Editorial Title Header */}
      <section className="bg-emerald-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={soilImg}
            alt="Soil Testing Workshop and Agricultural Focus"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-900/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs text-emerald-300/80 font-mono mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-bold">Our Focus</span>
          </nav>

          <span className="inline-flex items-center space-x-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <Sprout className="w-3.5 h-3.5 text-amber-400" />
            <span>Pillars of Activity</span>
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight mt-3">
            Primary Focus Areas
          </h1>
          <p className="text-emerald-200/90 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
            Raita Mitra Social Trust coordinates high-relevance operations from organic soil diagnostics to computational intelligence classes for government public schools. Use the interaction tags below to explore our core work.
          </p>
        </div>
      </section>

      {/* Main Core Content Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Tab Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {focusAreas.map((area) => {
            const IconComp = area.icon;
            const isActive = activeTab === area.id;
            return (
              <button
                key={area.id}
                onClick={() => setActiveTab(area.id)}
                className={`cursor-pointer group flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                  isActive
                    ? "bg-emerald-850 text-white border-emerald-850 shadow-md scale-101"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300 shadow-2xs"
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all mb-2 ${
                  isActive ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-800"
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

        {/* Panel Container showing visual state */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <AnimatePresence mode="wait">
            {focusAreas.map((area) => {
              if (area.id !== activeTab) return null;
              const IconComp = area.icon;
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12"
                >
                  
                  {/* Detailed Description Panel */}
                  <div className="p-8 sm:p-10 lg:col-span-7 flex flex-col justify-between space-y-8">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl">{area.emoji}</span>
                        <span className="font-mono text-[9px] font-extrabold text-emerald-805 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded">
                          Initiative Focus
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                        {area.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-700 bg-emerald-50 border-l-2 border-emerald-600 p-4 rounded-r-xl italic leading-relaxed">
                        <strong>Impact Goal:</strong> {area.impactFocus}
                      </p>

                      <div className="space-y-4 mt-8">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest font-mono">Core Sub-Programs</h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-stone-605">
                          {area.items.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-stone-100 flex items-center justify-between flex-wrap gap-4">
                      <span className="text-[10px] text-stone-400 font-medium">
                        Focus Areas Coordination, Haveri, koppal, Dharwad
                      </span>
                      <button
                        onClick={() => openDonateModal()}
                        className="cursor-pointer inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Sponsor this initiative</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                  {/* Image presentation block */}
                  <div className="lg:col-span-5 relative bg-stone-950 min-h-[300px] lg:min-h-full">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
