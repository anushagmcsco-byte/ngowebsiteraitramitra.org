"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Leaf,
  Lock,
  LogOut,
  Sparkles,
  ShieldCheck,
  Award,
  Building,
  Info,
  Percent,
  CheckCircle2,
  X,
  Menu,
  FileText,
  Users,
  CreditCard,
  Settings,
  ChevronRight
} from "lucide-react";
import { defaultBlogs, BlogPost } from "@/lib/blogs";

// Define the Shared Layout Context
interface LayoutContextType {
  openDonateModal: (amount?: number) => void;
  openAdminPortal: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  blogs: BlogPost[];
  refreshBlogsFromServer: () => Promise<void>;
  donateAmount: number;
  setDonateAmount: (val: number) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used inside a LayoutShell wrapper");
  }
  return context;
}

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogs);
  const [donateAmount, setDonateAmount] = useState<number>(5000);
  const [showDonateModal, setShowDonateModal] = useState<boolean>(false);
  
  // Trustee states
  const [showAdminPortal, setShowAdminPortal] = useState<boolean>(false);
  const [adminPasskey, setAdminPasskey] = useState<string>("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Form states for donation simulator
  const [donationLoading, setDonationLoading] = useState<boolean>(false);
  const [donationSuccess, setDonationSuccess] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [donationForm, setDonationForm] = useState({
    donorName: "",
    donorPan: "",
    email: "",
    phone: "",
    isIndianCitizen: true
  });

  // Storage synced registers
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [donationSubmissions, setDonationSubmissions] = useState<any[]>([]);

  // Function to load posts
  const refreshBlogsFromServer = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
          localStorage.setItem("raitamitra_blogs", JSON.stringify(data));
        }
      }
    } catch (err) {
      console.warn("Could not retrieve live blogs from server, continuing with client storage.");
    }
  };

  // Sync client credentials and local databases on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Defer state updates to prevent synchronous cascade warnings in Next.js
      setTimeout(() => {
        const userLoggedIn = localStorage.getItem("raitamitra_admin_session") === "active";
        if (userLoggedIn) {
          setIsAdminLoggedIn(true);
        }

        const localInquiries = localStorage.getItem("raitamitra_inquiries");
        if (localInquiries) {
          try { setContactSubmissions(JSON.parse(localInquiries)); } catch(e) {}
        }

        const localPledges = localStorage.getItem("raitamitra_pledges");
        if (localPledges) {
          try { setDonationSubmissions(JSON.parse(localPledges)); } catch(e) {}
        }

        refreshBlogsFromServer();
      }, 0);
    }
  }, []);

  const openDonateModal = (amount?: number) => {
    if (amount) {
      setDonateAmount(amount);
    }
    setDonationSuccess(null);
    setReceiptData(null);
    setShowDonateModal(true);
  };

  const openAdminPortal = () => {
    setAdminLoginError(null);
    setShowAdminPortal(true);
  };

  // Admin login submission handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasskey === "raitamitra2026") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("raitamitra_admin_session", "active");
      setAdminLoginError(null);
      setAdminPasskey("");
      // Redirect or show success
      alert("Verification clean. Session established successfully!");
    } else {
      setAdminLoginError("Invalid Trustee validation secret code. Access denied.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("raitamitra_admin_session");
    alert("Session terminated securely.");
  };

  // Donate modal submit handler
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
        localStorage.setItem("raitamitra_pledges", JSON.stringify(updated));
      } else {
        setDonationSuccess(`Error: ${data.error || "Submission rejected"}`);
      }
    } catch (err) {
      setDonationSuccess("Connection error, using local simulation mode.");
      
      // Standalone simulation fallback
      const simulatedReceiptNo = "RMST/" + Math.floor(100000 + Math.random() * 900000);
      const simulatedDate = new Date().toLocaleDateString("en-IN");
      const simulatedData = {
        receiptNumber: simulatedReceiptNo,
        date: simulatedDate,
        amount: donateAmount,
        donorName: donationForm.donorName || "Supporter Partner",
        exemptAmount: donateAmount * 0.5,
        status: "Pledging Active"
      };
      setReceiptData(simulatedData);
      setDonationSuccess("Simulated receipts generated. Saved locally!");

      const newSimulatedPledge = {
        id: `plg-${Date.now()}`,
        receiptNumber: simulatedReceiptNo,
        donorName: donationForm.donorName || "Supporter Partner",
        donorPan: donationForm.donorPan || "N/A",
        email: donationForm.email || "N/A",
        phone: donationForm.phone || "N/A",
        amount: donateAmount,
        date: simulatedDate
      };
      const updated = [newSimulatedPledge, ...donationSubmissions];
      setDonationSubmissions(updated);
      localStorage.setItem("raitamitra_pledges", JSON.stringify(updated));
    } finally {
      setDonationLoading(false);
    }
  };

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

  // Navbar link items
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Focus", href: "/our-focus" },
    { name: "Project Gallery", href: "/gallery" },
    { name: "Trust Blog", href: "/blog" },
    { name: "Compliance", href: "/compliance" },
    { name: "Impact & Pledge", href: "/impact" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <LayoutContext.Provider
      value={{
        openDonateModal,
        openAdminPortal,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        blogs,
        refreshBlogsFromServer,
        donateAmount,
        setDonateAmount
      }}
    >
      <div className="min-h-screen flex flex-col font-sans text-stone-900 bg-stone-50/20">
        
        {/* Consistent Top Nav Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-xs relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            
            {/* Left Header Logo branding */}
            <Link href="/" className="flex items-center space-x-3 group outline-hidden cursor-pointer">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 transition-all group-hover:scale-105">
                <Leaf className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1.5 leading-none">
                  <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-emerald-950">
                    Raita Mitra
                  </span>
                  <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-amber-600 bg-amber-50 px-1 py-0.5 rounded-sm border border-amber-200">
                    Social Trust
                  </span>
                </div>
                <span className="text-[9px] text-stone-500 font-mono tracking-tight block mt-0.5 leading-none">
                  Hubballi, Karnataka • Reg: 2021
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-5 text-xs font-bold uppercase tracking-wider text-stone-600">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors py-1 hover:text-emerald-800 ${
                      isActive
                        ? "text-emerald-800 border-b-2 border-emerald-700 font-extrabold pb-0.5"
                        : "text-stone-500 font-semibold"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="h-4 w-[1px] bg-stone-200" />

              {/* Trustee logout or login status */}
              {isAdminLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-emerald-800 font-mono font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    Admin Session Active
                  </span>
                  <button
                    onClick={handleAdminLogout}
                    className="cursor-pointer text-[10px] text-stone-500 hover:text-stone-900 border border-stone-200 hover:border-stone-400 font-mono px-2 py-1 rounded shadow-2xs"
                    title="Terminate Trustee Session"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={openAdminPortal}
                  style={{ paddingLeft: '8px', paddingRight: '8px' }}
                  className="cursor-pointer inline-flex items-center space-x-1.5 underline text-[10px] text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-md py-1 border border-emerald-200 transition-all font-mono"
                >
                  <Lock className="w-3 h-3 text-emerald-700 animate-pulse" />
                  <span>Trustee Portal</span>
                </button>
              )}
            </nav>

            {/* Mobile Navigation controls */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="cursor-pointer p-2 rounded-lg bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Overlay Menu Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-stone-200 bg-white shadow-lg overflow-hidden absolute left-0 right-0 top-full z-45"
              >
                <div className="p-4 space-y-3 flex flex-col text-sm font-semibold uppercase tracking-wider text-stone-750">
                  {navLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`p-2 rounded-lg transition-all flex items-center justify-between ${
                          isActive
                            ? "bg-emerald-50 text-emerald-950 font-bold border-l-4 border-emerald-800 pl-3"
                            : "hover:bg-stone-50 text-stone-600 pl-2"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="w-4 h-4 text-stone-400" />
                      </Link>
                    );
                  })}

                  <div className="border-t border-stone-100 my-2 pt-3">
                    {isAdminLoggedIn ? (
                      <div className="flex items-center justify-between bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                        <span className="text-xs font-mono font-bold text-emerald-850">Trustee Session Active</span>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            handleAdminLogout();
                          }}
                          className="cursor-pointer text-xs text-red-700 font-bold"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          openAdminPortal();
                        }}
                        className="cursor-pointer w-full py-2.5 text-center text-xs font-bold font-mono border border-emerald-250 text-emerald-950 bg-emerald-50/80 rounded-xl hover:bg-emerald-100 flex items-center justify-center space-x-2"
                      >
                        <Lock className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Admin Trustee Portal</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </header>

        {/* Dynamic page content inject area */}
        <div className="flex-1">
          {children}
        </div>

        {/* Consistent Footer across all routes */}
        <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-16 shrink-0 z-10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-emerald-500" />
                  <span className="font-display text-lg font-bold text-white tracking-tight">Raita Mitra Social Trust</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
                  Registered non-profit public charitable trust under the Indian Trusts Act, 1882 working proactively to improve rural livelihoods across Karnataka.
                </p>
                <div className="text-[10px] font-mono text-stone-600 block leading-relaxed">
                  Hubballi Registration: HBL-4-00006-2021-22 <br />
                  80G Provisional Exemption Approved
                </div>
              </div>

              {/* Column 2 navigation routing */}
              <div>
                <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono mb-4">Quick Navigation</h4>
                <ul className="text-xs space-y-2.5 font-medium">
                  {navLinks.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="hover:text-amber-400 transition-all">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 active operational districts */}
              <div>
                <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono mb-4">Operational Districts</h4>
                <p className="text-xs leading-relaxed text-stone-500 mb-3">
                  Delivering sustainable agriculture, micro-credits, and AI skills training across:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Dharwad", "Belagavi", "Haveri", "Raichur", "Koppal", "Hubballi Rural"].map((d, i) => (
                    <span key={i} className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded border border-stone-700/60 font-mono">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Column 4 support details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono mb-4">Support Our Cause</h4>
                <p className="text-xs leading-relaxed text-stone-500">
                  Participate by sponsoring chemical-free topsoils, high school computer laboratories, and Self-Help Groups.
                </p>
                <button
                  onClick={() => openDonateModal()}
                  className="cursor-pointer w-full text-center bg-emerald-850 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center space-x-1 transition-all border border-emerald-800 hover:scale-101"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-250 animate-pulse" />
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

        {/* Global Donation Receipt Simulator Modal */}
        {showDonateModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-stone-200 shadow-2xl mt-10 mb-10"
            >
              {/* Modal Header */}
              <div className="p-6 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display text-lg font-bold">Raita Mitra Trust Receipt Simulator</h3>
                </div>
                <button
                  onClick={() => setShowDonateModal(false)}
                  className="cursor-pointer p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
                
                {/* Visual Impact Box */}
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shrink-0 border border-emerald-250">
                    ₹
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono">
                      Dynamic Contribution Impact
                    </span>
                    <h4 className="text-sm font-extrabold text-stone-900 uppercase tracking-tight">
                      {currentImpact.desc}
                    </h4>
                    <p className="text-xs text-stone-605 leading-relaxed">
                      {currentImpact.scale}
                    </p>
                  </div>
                </div>

                {donationSuccess ? (
                  <div className="space-y-5">
                    <div className="bg-emerald-50 border border-emerald-250 p-4 rounded-xl text-emerald-900 text-xs font-bold text-center">
                      ✓ {donationSuccess}
                    </div>

                    {receiptData && (
                      <div className="border border-stone-200 rounded-2xl bg-stone-50 p-6 space-y-4 font-mono text-[10px] tracking-tight text-stone-700 relative overflow-hidden shadow-2xs">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-stone-100/40 rounded-full border border-dashed border-stone-200 select-none pointer-events-none flex items-center justify-center font-black uppercase tracking-wider text-stone-300 transform rotate-15 translate-x-4 -translate-y-4">
                          Approved
                        </div>
                        
                        <div className="text-center border-b border-stone-200 pb-4 space-y-1">
                          <h4 className="text-xs font-extrabold text-stone-900 uppercase">Raita Mitra Social Trust (R)</h4>
                          <span className="text-[9px] text-stone-500">Pride Icon, Gokul Road, Hubballi - 580030</span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 text-[10px]">
                          <div><span className="text-stone-450 block text-[9px] uppercase font-bold">Receipt Reference</span> {receiptData.receiptNumber}</div>
                          <div><span className="text-stone-450 block text-[9px] uppercase font-bold">Date Issued</span> {receiptData.date}</div>
                          <div><span className="text-stone-450 block text-[9px] uppercase font-bold">Supporter Name</span> {receiptData.donorName}</div>
                          <div><span className="text-stone-450 block text-[9px] uppercase font-bold">Exemption Code</span> Section 80G Provisional</div>
                          <div><span className="text-stone-450 block text-[9px] uppercase font-bold font-sans">Pledge Amount</span> ₹{receiptData.amount.toLocaleString("en-IN")}</div>
                          <div><span className="text-stone-450 block text-[9px] uppercase font-bold">Exhaust Tax Exemption</span> ₹{receiptData.exemptAmount.toLocaleString("en-IN")} (50%)</div>
                        </div>

                        <div className="pt-4 border-t border-stone-200 text-center text-[9px] text-stone-500 max-w-sm mx-auto leading-relaxed">
                          This is a digital simulation of the provisional 80G tax receipt matching Raita Mitra Social Trust credentials. Real receipts are saved locally. Thank you!
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setDonationSuccess(null);
                          setReceiptData(null);
                        }}
                        className="cursor-pointer flex-1 py-2.5 text-center bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-all"
                      >
                        File Another Pledge
                      </button>
                      <button
                        onClick={() => setShowDonateModal(false)}
                        className="cursor-pointer flex-1 py-2.5 text-center bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg transition-all"
                      >
                        Finish & Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleDonationSubmit} className="space-y-4">
                    
                    {/* Amount Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-stone-700 uppercase tracking-wider font-mono">
                        Pledge Contribution (INR)
                      </label>
                      <input
                        type="number"
                        min="100"
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(Number(e.target.value))}
                        className="w-full bg-stone-50/80 border border-stone-300 font-bold px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden text-emerald-950 font-mono text-base"
                        required
                      />
                    </div>

                    {/* Pre-selectors */}
                    <div className="flex gap-2.5 flex-wrap">
                      {[1500, 5000, 15000, 30000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setDonateAmount(preset)}
                          className={`cursor-pointer px-4.5 py-1.5 text-xs font-extrabold rounded-lg font-mono transition-all ${
                            donateAmount === preset
                              ? "bg-emerald-800 text-white border-transparent shadow-xs"
                              : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-250"
                          }`}
                        >
                          ₹{preset.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-stone-700 uppercase tracking-wider font-mono">Donor Full Name</label>
                        <input
                          type="text"
                          value={donationForm.donorName}
                          onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
                          className="w-full bg-stone-50/80 border border-stone-250 px-3.5 py-2 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden text-sm"
                          placeholder="Your legal name"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-stone-700 uppercase tracking-wider font-mono">Donor PAN Number</label>
                        <input
                          type="text"
                          value={donationForm.donorPan}
                          onChange={(e) => setDonationForm({ ...donationForm, donorPan: e.target.value })}
                          className="w-full bg-stone-50/80 border border-stone-250 px-3.5 py-2 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden font-mono text-sm uppercase"
                          placeholder="ABCDE1234F"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-stone-700 uppercase tracking-wider font-mono">Mail Address</label>
                        <input
                          type="email"
                          value={donationForm.email}
                          onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                          className="w-full bg-stone-50/80 border border-stone-250 px-3.5 py-2 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden text-sm"
                          placeholder="name@domain.com"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-stone-700 uppercase tracking-wider font-mono">Mobile Number</label>
                        <input
                          type="tel"
                          value={donationForm.phone}
                          onChange={(e) => setDonationForm({ ...donationForm, phone: e.target.value })}
                          className="w-full bg-stone-50/80 border border-stone-250 px-3.5 py-2 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden text-sm font-mono"
                          placeholder="+91 Mobile number"
                        />
                      </div>
                    </div>

                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-150 flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        id="citizen-chk"
                        checked={donationForm.isIndianCitizen}
                        onChange={(e) => setDonationForm({ ...donationForm, isIndianCitizen: e.target.checked })}
                        className="rounded text-emerald-850 accent-emerald-800"
                      />
                      <label htmlFor="citizen-chk" className="text-xs text-stone-550 leading-none">
                        I am a citizen of the Republic of India residing domestically.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={donationLoading}
                      className="cursor-pointer w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all mt-3 active:scale-99"
                    >
                      <span>
                        {donationLoading ? "Saving Pledge..." : `Pledge ₹${donateAmount.toLocaleString("en-IN")} & Create Receipt`}
                      </span>
                    </button>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Global Access Trustee Portal Modal */}
        {showAdminPortal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl overflow-hidden max-w-md w-full border border-stone-200 shadow-2xl"
            >
              <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-amber-400" />
                  <span className="font-display font-bold text-sm tracking-widest uppercase">Trustee Gateway</span>
                </div>
                <button
                  onClick={() => setShowAdminPortal(false)}
                  className="cursor-pointer text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {isAdminLoggedIn ? (
                  <div className="space-y-4 text-center">
                    <p className="text-xs text-stone-500 uppercase tracking-widest font-mono font-bold text-emerald-805">
                      Security Verification Verified
                    </p>
                    <p className="text-sm text-stone-800">
                      You are correctly logged in as a managing official. Click below to enter the live dynamic administrative boards.
                    </p>

                    <div className="flex gap-2">
                      <Link
                        href="/blog"
                        onClick={() => setShowAdminPortal(false)}
                        className="cursor-pointer flex-1 py-2.5 text-center bg-stone-950 hover:bg-stone-850 text-white text-xs font-bold font-mono rounded"
                      >
                        Open Blog Editor
                      </Link>
                      <button
                        onClick={() => {
                          handleAdminLogout();
                          setShowAdminPortal(false);
                        }}
                        className="cursor-pointer py-2.5 px-4 text-center border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold rounded"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs text-stone-500 leading-relaxed font-medium">
                        This portal is dedicated to official board trustees of **Raita Mitra Social Trust**.
                      </p>
                      <label className="text-xs font-extrabold text-stone-700 uppercase tracking-wider font-mono">
                        Passkey Verification
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={adminPasskey}
                        onChange={(e) => setAdminPasskey(e.target.value)}
                        className="w-full bg-stone-50/80 border border-stone-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden font-mono text-center text-sm"
                        required
                      />
                    </div>

                    {adminLoginError && (
                      <p className="text-xs text-red-700 font-semibold bg-red-50 py-2 border border-red-150 rounded text-center">
                        {adminLoginError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="cursor-pointer w-full text-center bg-stone-950 hover:bg-stone-850 text-white font-bold text-xs py-3 rounded-xl transition-all font-mono"
                    >
                      Authenticate Access
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </LayoutContext.Provider>
  );
}
