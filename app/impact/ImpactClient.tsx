"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import womenImg from "../../src/assets/images/women_empowerment_1779872106993.png";
import { motion } from "motion/react";
import {
  Sparkles,
  ChevronRight,
  TrendingUp,
  Heart,
  Users,
  Sprout,
  GraduationCap
} from "lucide-react";
import { useLayout } from "@/components/LayoutShell";

export default function ImpactPage() {
  const { donateAmount, setDonateAmount, openDonateModal } = useLayout();

  const getImpactMessageOnAmount = (amount: number) => {
    if (amount < 2000) {
      return {
        category: "AGRICULTURE INPUTS",
        desc: "Organic seed packs & professional soil testing",
        scale: `Supports ${Math.max(1, Math.floor(amount / 500))} marginalized family farmer(s) with bio-fertilizers and core agricultural inputs directly in Dharwad & Belagavi.`,
        icon: Sprout,
        color: "text-emerald-700 bg-emerald-50 border-emerald-100"
      };
    } else if (amount < 10000) {
      return {
        category: "DIGITAL LITERACY",
        desc: "Digital & AI tools training sponsorship",
        scale: `Funds comprehensive computer literacy, coding modules, and workspace productivity tools education for ${Math.max(1, Math.floor(amount / 3000))} rural youth for standard programs.`,
        icon: GraduationCap,
        color: "text-blue-700 bg-blue-50 border-blue-100"
      };
    } else if (amount < 30000) {
      return {
        category: "WOMEN SHG CAPITAL",
        desc: "Women SHG microenterprise startup grant",
        scale: `Provides direct capital, raw materials, processing machinery, and financial ledger mentorship to coordinate setup for a local Self-Help Group (SHG) enabling sustainable self-reliance.`,
        icon: Users,
        color: "text-amber-700 bg-amber-50 border-amber-100"
      };
    } else {
      return {
        category: "REGIONAL WATER & HEALTH",
        desc: "Village healthcare & climate action initiatives",
        scale: `Sponsors complete mobile healthcare check-up camps, water diagnostics studies, sustainable community crops counseling, and climate-resiliency adaptation guidelines for a whole farming hamlet.`,
        icon: Heart,
        color: "text-rose-700 bg-rose-50 border-rose-100"
      };
    }
  };

  const currentImpact = getImpactMessageOnAmount(donateAmount);
  const IconComponent = currentImpact.icon;

  const presets = [1500, 5000, 15000, 30000];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-24">
      
      {/* Title Header Banner */}
      <section className="bg-emerald-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={womenImg}
            alt="Raita Mitra Community Social Impact and Women SHG Empowerment"
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
            <span className="text-amber-400 font-bold">Impact</span>
          </nav>

          <span className="inline-flex items-center space-x-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Social Return Simulator</span>
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight mt-3">
            Impact Calculator & Pledge
          </h1>
          <p className="text-emerald-200/90 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
            Move the interactive slider or click any of our quick preset cards below to simulate the exact, physical impact of your gift. Calculate tax benefits immediately.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Interactive slider and presets selector */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-8 shadow-2xs flex flex-col justify-between">
            
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-stone-400 font-mono tracking-wider uppercase block">
                1. Adjust Contribution Level
              </span>

              {/* Real slider */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 font-mono">Min Contribution</span>
                  <span className="text-base font-extrabold text-stone-950 font-mono">₹{donateAmount.toLocaleString("en-IN")}</span>
                  <span className="text-xs font-bold text-stone-500 font-mono">Max: ₹50,000</span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={donateAmount}
                  onChange={(e) => setDonateAmount(Number(e.target.value))}
                  className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                />
              </div>

              {/* Presets Grid */}
              <div className="space-y-2">
                <span className="text-[10px] text-stone-400 font-mono font-bold uppercase tracking-wider block">Or select Preset:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {presets.map((p) => (
                    <button
                      key={p}
                      onClick={() => setDonateAmount(p)}
                      className={`cursor-pointer py-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                        donateAmount === p
                          ? "bg-emerald-850 text-white border-transparent shadow-xs scale-102"
                          : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      ₹{p.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-6 space-y-4">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-stone-400 block font-mono">Section 80G Tax Exclusion (50%)</span>
                  <span className="text-xs font-bold text-stone-850">Your simulated net taxable deduction eligibility:</span>
                </div>
                <span className="font-mono text-base font-extrabold text-emerald-800">
                  ₹{(donateAmount * 0.5).toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={() => openDonateModal(donateAmount)}
                className="cursor-pointer w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Submit Donation Pledge & Generate Receipt</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual output display feedback */}
          <div className="md:col-span-5 bg-stone-900 text-stone-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xs border border-stone-850">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
            
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-stone-500 font-mono tracking-wider uppercase block">
                2. Live Impact Feedback
              </span>

              {/* Dynamic feedback panel */}
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 font-mono text-[9px] font-extrabold tracking-wider text-amber-400 uppercase">
                  <span>{currentImpact.category}</span>
                </div>

                <div className="flex gap-3 items-start pt-2">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                    <IconComponent className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-display text-base font-bold leading-tight uppercase">
                      {currentImpact.desc}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-stone-450 leading-relaxed font-medium pt-1">
                  {currentImpact.scale}
                </p>

              </div>
            </div>

            {/* Quote details */}
            <div className="border-t border-stone-800/80 pt-6 mt-6 text-[10px] text-stone-500 italic max-w-xs leading-relaxed font-mono">
              &ldquo;Transforming transparent donations into soil organic carbon meters, computer laboratories, and local women livelihood units with complete audits.&rdquo;
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
