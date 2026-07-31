"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import teamMeetingImg from "../../src/assets/images/about_trust_meeting_1780376496895.png";
import {
  Building,
  Info,
  ShieldCheck,
  Award,
  Percent,
  CheckCircle2,
  FileText,
  Lock,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function CompliancePage() {
  const complianceSpecs = [
    {
      label: "Registered Under",
      value: "Indian Trusts Act, 1882",
      description: "Operates lawfully as a registered public charitable trust since 2021 (Reg No: HBL-4-00006-2021-22). Approved to support public welfare.",
      icon: Building,
      status: "Verified Active"
    },
    {
      label: "NGO Darpan NITI Aayog ID",
      value: "KA/2023/0342549",
      description: "Successfully cataloged on the NITI Aayog portal, Government of India, promoting high transparency, accountability, and public reporting.",
      icon: Info,
      status: "Active Index"
    },
    {
      label: "Corporate Social Responsibility (CSR)",
      value: "Ministry ID: CSR00059487",
      description: "Eligible for Corporate Social Responsibility programs under MCA guidelines. Executes social programs in scientific soils and public learning.",
      icon: Award,
      status: "Govt Cleared"
    },
    {
      label: "PAN Registry Details",
      value: "AAETR3286K",
      description: "Verified Permanent Account Number issued directly by the Income Tax Department of India to monitor operations.",
      icon: ShieldCheck,
      status: "Compliant"
    },
    {
      label: "80G provisional Exemption",
      value: "Valid AY 2024-25 to 2026-27",
      description: "Entitles domestic corporate and retail donors to a legal 50% tax deduction on contributions under section 80G.",
      icon: Percent,
      status: "Approved"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-24">
      {/* Title Header Banner */}
      <section className="bg-emerald-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={teamMeetingImg}
            alt="Raita Mitra Social Trust Official Governance and Compliance Meeting"
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
            <span className="text-amber-400 font-bold">Compliance</span>
          </nav>

          <span className="inline-flex items-center space-x-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Accountability & Statutory Records</span>
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight mt-3">
            Statutory Compliance Registry
          </h1>
          <p className="text-emerald-200/90 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
            Raita Mitra Social Trust maintains 100% transparent records. We are fully registered on central databases and comply with regional administrative laws, ensuring all support flows to fields directly.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Cards showing each registration */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-display text-xl font-bold tracking-tight text-stone-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-800" />
              <span>Verified Institution Certificates</span>
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {complianceSpecs.map((spec, index) => {
                const IconComp = spec.icon;
                return (
                  <div
                    key={index}
                    className="p-6 bg-white border border-stone-200 rounded-2xl shadow-2xs hover:shadow-sm transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-805 flex items-center justify-center font-bold">
                          <IconComp className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <span className="text-xs text-stone-400 font-mono font-extrabold tracking-wide uppercase block">
                            {spec.label}
                          </span>
                          <span className="text-sm font-bold text-stone-900">
                            {spec.value}
                          </span>
                        </div>
                      </div>

                      <span className="self-start sm:self-auto text-[9px] uppercase font-mono tracking-widest font-extrabold text-emerald-800 bg-emerald-100/55 px-2.5 py-1 rounded-md">
                        ✓ {spec.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-605 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar: Quick FAQs and PDF reporting disclaimer */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Transparency Card */}
            <div className="bg-stone-900 text-stone-300 rounded-2xl p-6 space-y-4 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-600/10 rounded-full blur-lg" />
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-amber-500" />
                <h4 className="text-white font-display font-medium text-sm">Transparency Standard</h4>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Raita Mitra Social Trust coordinates public auditing of all capital allocations. Balance sheets are maintained by regional chartered accounting boards in Dharwad and filed annually with the District Sub-Registrar.
              </p>
              <div className="border-t border-stone-800 pt-3.5 flex gap-2 justify-between">
                <span className="text-[10px] text-stone-500 font-mono">Filing Cycle: FY 2025-26 Clean</span>
                <span className="text-[10px] text-emerald-400 font-mono">Audited</span>
              </div>
            </div>

            {/* Quick FAQ info panel */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
              <h4 className="text-sm font-bold font-display text-stone-950 uppercase tracking-tight">Compliance Helpdesk</h4>
              
              <div className="space-y-3.5 text-xs text-stone-605">
                <div className="space-y-1">
                  <span className="font-bold text-stone-850 block">Are donations tax deductible?</span>
                  <p className="leading-relaxed">Yes. Domestic contributions to the Trust are provisional 80G tax deductible up to 50% under Section 80G of the Income Tax Act.</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-stone-850 block">Does the trust receive global funds?</span>
                  <p className="leading-relaxed">At present, we only receive and coordinate domestic INR contributions inside India from Indian citizens.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
