"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Leaf,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  Award,
  Users,
  Info
} from "lucide-react";

// Image imports
import teamMeetingImg from "../../src/assets/images/about_trust_meeting_1780376496895.png";
import heroImg from "../../src/assets/images/karnataka_farmer_hero_1779872061305.png";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"history" | "compliance" | "team">("history");

  const complianceItems = [
    {
      label: "NGO Darpan ID",
      value: "KA/2023/0342549",
      description: "Registered on NITI Aayog Portal for high-level national coordinate validation."
    },
    {
      label: "PAN Record",
      value: "AAETR3286K",
      description: "Indian Income Tax Department permanent account register tag."
    },
    {
      label: "80G Provisional Tax Exemption ID",
      value: "UR/2021-22/EX-000492",
      description: "Authorizes and issues registered 50% income-tax deductions on eligible public contributions."
    },
    {
      label: "12A Registration Number",
      value: "REG-803248-2021",
      description: "Statutory income tax immunity validation for registered Indian social welfare organizations."
    }
  ];

  const trusteesList = [
    {
      name: "Sri. Mallikarjun S. G.",
      role: "Founder Trustee",
      expertise: "Organic Livelihoods & Farm Cooperatives",
      bio: "An active champion of sustainable agriculture in Dharwad, directing grassroots campaigns to upgrade micro-husbandry yields security."
    },
    {
      name: "Dr. Sangamesh M.",
      role: "Soil Science Coordinator",
      expertise: "Agricultural Biochemistry",
      bio: "Holds two decades of chemical-free topsoil research, guiding regional centers to implement organic composting protocols."
    },
    {
      name: "Smt. Shilpa Patil",
      role: "Women Empowerment Director",
      expertise: "Self-Help Group Financing",
      bio: "Leads women financial inclusion efforts, providing hands-on training to establish local micro-enterprises across Haveri and Koppal."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-emerald-600/20 selection:text-emerald-950 pb-20">
      
      {/* Hero Header Banner */}
      <section className="bg-emerald-950 text-white relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={heroImg}
            alt="Lush green fields of Hubballi, Karnataka"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-900/60" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            About Our Institution
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight mt-4 max-w-4xl leading-tight">
            Uplifting Rural Lives, Fostering Autonomy
          </h1>
          <p className="text-emerald-200/80 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed font-medium">
            Raita Mitra Social Trust is a registered public charitable institution. We work closely alongside smallholder farmers and marginalized households across Karnataka to make agricultural topsoils, computer skills, and women micro-credit structures sustainable.
          </p>
        </div>
      </section>

      {/* Main Core Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Extensive Dynamic Interactive Profile Box */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Professional Team Showcase Banner */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="relative h-64 sm:h-96 w-full bg-stone-100">
                <Image
                  src={teamMeetingImg}
                  alt="Raita Mitra Trust active community meeting in Hubballi, Karnataka"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 sm:p-8 bg-stone-900 text-white space-y-2">
                <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                  Sustainable Collaboration Rooted in trust
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed max-w-2xl">
                  Field officers, agrarian researchers, and progressive regional trustees gather in digital hub meeting rooms to design multi-district campaigns across Dharwad, Haveri, Belagavi, and Koppal districts.
                </p>
              </div>
            </div>

            {/* Toggle tabs content container */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="flex border-b border-stone-150">
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 font-mono ${
                    activeTab === "history"
                      ? "text-emerald-800 border-emerald-800 bg-stone-50/50"
                      : "text-stone-500 border-transparent hover:text-stone-850 hover:bg-stone-50/20"
                  }`}
                >
                  History & Pillars
                </button>
                <button
                  onClick={() => setActiveTab("compliance")}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 font-mono ${
                    activeTab === "compliance"
                      ? "text-emerald-800 border-emerald-800 bg-stone-50/50"
                      : "text-stone-500 border-transparent hover:text-stone-850 hover:bg-stone-50/20"
                  }`}
                >
                  Statutory Records
                </button>
                <button
                  onClick={() => setActiveTab("team")}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 font-mono ${
                    activeTab === "team"
                      ? "text-emerald-800 border-emerald-800 bg-stone-50/50"
                      : "text-stone-500 border-transparent hover:text-stone-850 hover:bg-stone-50/20"
                  }`}
                >
                  Active Trustees
                </button>
              </div>

              <div className="p-6 sm:p-8">
                
                {activeTab === "history" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 text-stone-650 text-sm sm:text-base leading-relaxed"
                  >
                    <h3 className="font-display text-xl font-extrabold text-stone-900">
                      The Journey of Raita Mitra Social Trust
                    </h3>
                    <p>
                      Established in **Hubballi, Karnataka** under the Indian Trusts Act, 1882, the trust was formed by active rural reformers determined to reverse chemical topsoil degradation and vocational migration. Over subsequent years, Raita Mitra has successfully expanded into diverse public support channels—scaling scientific organic cultivation, providing high-quality digital training clusters, and driving microfinance inclusion.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                        <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-850 font-mono block">Ecosystem Resilience</span>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Helping over 1,400 farmers construct bio-digesters and rainwater recharging structures on compact farming lands.
                        </p>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                        <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-850 font-mono block">Technological Access</span>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Empowering public schools across Belagavi with modern computers, coding workshops, and productivity packages.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "compliance" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-extrabold text-stone-900">
                        Institutional Compliance & Transparency
                      </h3>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                        Audited Trust
                      </span>
                    </div>
                    <p className="text-stone-500 text-xs sm:text-sm">
                      We comply with public financial accounting systems (PFMS) and maintain standard, audited balance sheets filed on regional directories. Tax exemptions are provisionally approved under Section 80G.
                    </p>

                    <div className="grid grid-cols-1 gap-4 pt-2">
                      {complianceItems.map((item, index) => (
                        <div key={index} className="border border-stone-200 rounded-xl p-4 transition-all hover:shadow-2xs">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="text-xs font-extrabold font-mono text-stone-750 uppercase tracking-wide">
                              {item.label}
                            </span>
                            <span className="text-xs bg-emerald-50 text-emerald-850 border border-emerald-100 font-mono px-2.5 py-0.5 rounded font-bold self-start sm:self-auto">
                              {item.value}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "team" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-xl font-extrabold text-stone-900">
                        Governance & Leadership Board
                      </h3>
                      <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-2xl">
                        Our board of trustees consists of dedicated agricultural specialists, public policy advisors, and social workers.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 pt-2">
                      {trusteesList.map((tr, index) => (
                        <div key={index} className="flex gap-4 p-5 rounded-xl border border-stone-150 bg-stone-50/50">
                          <div className="w-10 h-10 rounded-full bg-emerald-150 text-emerald-900 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-250">
                            <Users className="w-4 h-4 text-emerald-700" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                              <h4 className="text-sm font-bold text-stone-900">{tr.name}</h4>
                              <span className="text-[10px] font-mono text-emerald-850 font-bold uppercase tracking-wider">
                                {tr.role}
                              </span>
                            </div>
                            <span className="text-xs text-stone-500 block font-medium">Expertise: {tr.expertise}</span>
                            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed pt-1">
                              {tr.bio}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

          </div>

          {/* Right Column: Visually Engaging Vision/Mission and FAQ box */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Stats sidebar widget */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5 shadow-xs">
              <span className="text-[10px] font-bold text-emerald-700 font-mono uppercase tracking-widest block">
                Impact Snapshot
              </span>
              <div className="space-y-4">
                <div className="pb-3.5 border-b border-stone-100">
                  <span className="text-2xl font-black text-stone-900 tracking-tight block">1,400+</span>
                  <span className="text-xs text-stone-500 mt-0.5 block leading-relaxed">Farmers mentored in Dharwad & Belagavi on bio-inputs.</span>
                </div>
                <div className="pb-3.5 border-b border-stone-100">
                  <span className="text-2xl font-black text-stone-900 tracking-tight block">12 SHGs</span>
                  <span className="text-xs text-stone-500 mt-0.5 block leading-relaxed">Women action clusters driving regional craft processing.</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-stone-900 tracking-tight block">180+ Pupils</span>
                  <span className="text-xs text-stone-500 mt-0.5 block leading-relaxed">Kids actively training on digital weather logic boards.</span>
                </div>
              </div>
            </div>

            {/* Strategic Coordinates */}
            <div className="bg-stone-900 text-stone-300 rounded-2xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />
              <h3 className="font-display text-white text-base font-bold mb-4">Official Coordinates:</h3>
              
              <div className="space-y-3.5 text-xs text-stone-400">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-stone-200 block">Registered Office Headquarters</span>
                    <span className="mt-0.5 block">Pride Icon, Gokul Road, Hubballi, Karnataka, India - 580030</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-stone-200 block">Electronic Mail</span>
                    <a href="mailto:raitamitrasocialtrust@gmail.com" className="text-emerald-400 hover:underline mt-0.5 block">
                      raitamitrasocialtrust@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-stone-200 block">Phone Support</span>
                    <a href="tel:+917676376221" className="text-stone-300 hover:underline mt-0.5 block">
                      +91 76763 76221
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
