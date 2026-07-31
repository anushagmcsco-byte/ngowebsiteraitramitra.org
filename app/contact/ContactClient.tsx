"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import heroImg from "../../src/assets/images/karnataka_farmer_hero_1779872061305.png";
import {
  MapPin,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Send,
  HelpCircle
} from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMsg(data.message || "Your inquiry has been submitted! Our trustees will contact you soon.");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: ""
        });

        // Add to local storage register for trustee portal log view
        const newInquiry = {
          id: `inq-${Date.now()}`,
          name: form.name,
          email: form.email,
          phone: form.phone || "N/A",
          subject: form.subject,
          message: form.message,
          date: new Date().toLocaleDateString("en-IN") + " " + new Date().toLocaleTimeString("en-IN")
        };
        const stored = localStorage.getItem("raitamitra_inquiries");
        const list = stored ? JSON.parse(stored) : [];
        const updated = [newInquiry, ...list];
        localStorage.setItem("raitamitra_inquiries", JSON.stringify(updated));

      } else {
        setSuccessMsg(`Error: ${data.error || "Failed to submit message."}`);
      }
    } catch (err) {
      setSuccessMsg("Network exception. Saving enquiry details locally!");
      
      // Local fallback
      const newInquiry = {
        id: `inq-${Date.now()}`,
        name: form.name,
        email: form.email,
        phone: form.phone || "N/A",
        subject: form.subject,
        message: form.message,
        date: new Date().toLocaleDateString("en-IN") + " " + new Date().toLocaleTimeString("en-IN")
      };
      const stored = localStorage.getItem("raitamitra_inquiries");
      const list = stored ? JSON.parse(stored) : [];
      const updated = [newInquiry, ...list];
      localStorage.setItem("raitamitra_inquiries", JSON.stringify(updated));

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: ""
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-905 pb-24">
      {/* Title Header Banner */}
      <section className="bg-emerald-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={heroImg}
            alt="Raita Mitra Social Trust Hubballi Coordination Office and Farmers"
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
            <span className="text-amber-400 font-bold">Contact</span>
          </nav>

          <span className="inline-flex items-center space-x-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Reach Out to Our Trustees</span>
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight mt-3">
            Contact Hubballi Headquarters
          </h1>
          <p className="text-emerald-200/90 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
            Have questions about organic programs, digital educational booths, or 80G tax exemptions? Send an enquiry message or connect directly using our official details below.
          </p>
        </div>
      </section>

      {/* Main Coordinate Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Inquiry Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            
            <div className="space-y-1.5 pb-2 border-b border-stone-100">
              <h3 className="font-display text-lg font-extrabold text-stone-950 uppercase tracking-tight">
                Submit Electronic Inquiry
              </h3>
              <p className="text-[10px] text-stone-400 font-mono">
                Average reply window: 24 Hours
              </p>
            </div>

            {successMsg ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-250 p-5 rounded-2xl text-emerald-900 text-xs sm:text-sm font-bold text-center">
                  ✓ {successMsg}
                </div>
                <button
                  onClick={() => setSuccessMsg(null)}
                  className="cursor-pointer w-full py-3 text-center bg-stone-100 hover:bg-stone-200 font-bold text-xs rounded-xl"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Full Name</label>
                    <input
                      type="text"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700/10 focus:outline-hidden"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Mail Address</label>
                    <input
                      type="email"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700/10 focus:outline-hidden"
                      placeholder="name@domain.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Contact / Mobile Number</label>
                    <input
                      type="tel"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-950 focus:ring-2 focus:ring-emerald-700/10 focus:outline-hidden font-mono"
                      placeholder="+91 Mobile number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Inquiry Topic</label>
                    <select
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700/10 focus:outline-hidden"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    >
                      <option>General Inquiry</option>
                      <option>Organic Farming Support</option>
                      <option>Digital Educational Booths</option>
                      <option>80G Tax Exemption & Receipts</option>
                      <option>Media or Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Detailed Message</label>
                  <textarea
                    rows={6}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-4 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700/10 focus:outline-hidden"
                    placeholder="Tell us details regarding your inquiry..."
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-99 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "Transmitting..." : "Send Inquiry Message"}</span>
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Coordinate Details */}
          <div className="lg:col-span-5 bg-stone-900 text-stone-300 rounded-3xl p-6 sm:p-8 space-y-8 flex flex-col justify-between relative overflow-hidden border border-stone-850">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-stone-450 font-mono tracking-wider uppercase block">
                Official Directory Details
              </span>

              {/* Physical details layout */}
              <div className="space-y-5 text-stone-300">
                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0 border border-white/5">
                    <Building className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-extrabold uppercase font-mono tracking-widest text-stone-400 block pb-1">Headquarters Location</span>
                    <span className="font-medium text-white">Raita Mitra Social Trust (R)</span>
                    <p className="mt-1 leading-relaxed text-stone-400">Pride Icon, Gokul Road, Hubballi, Karnataka - 580030</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0 border border-white/5">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-extrabold uppercase font-mono tracking-widest text-stone-400 block pb-1">Mail Support</span>
                    <a href="mailto:raitamitrasocialtrust@gmail.com" className="text-emerald-450 hover:underline font-bold text-white block">
                      raitamitrasocialtrust@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0 border border-white/5">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-extrabold uppercase font-mono tracking-widest text-stone-400 block pb-1">Helpline Phone</span>
                    <a href="tel:+917676376221" className="text-emerald-450 hover:underline font-bold text-white block font-mono">
                      +91 76763 76221
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Map locator mock indicator */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 text-[10px] text-stone-400 leading-relaxed font-mono">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span>Registered Coordinate Center:</span>
                <span className="text-white block font-sans font-bold mt-1">Dharwad District Jurisdiction Office</span>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
