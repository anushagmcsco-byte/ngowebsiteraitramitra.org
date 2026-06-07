"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  Search,
  BookOpen,
  ArrowRight,
  PlusCircle,
  X,
  Trash2,
  Edit,
  Sparkles,
  Award,
  ChevronDown,
  Info,
  Lock
} from "lucide-react";
import { useLayout } from "@/components/LayoutShell";
import { getCoverImageAsset, BlogPost } from "@/lib/blogs";

export default function BlogIndexPage() {
  const { blogs, refreshBlogsFromServer, isAdminLoggedIn, openAdminPortal } = useLayout();
  
  // Search + Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Admin state managers
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  // Form values
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<any>("Agriculture");
  const [formAuthor, setFormAuthor] = useState("");
  const [formReadTime, setFormReadTime] = useState("5 min read");
  const [formCoverImage, setFormCoverImage] = useState("soil");
  const [formSummary, setFormSummary] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Sync edits
  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormCategory("Agriculture");
    setFormAuthor("Sri. Mallikarjun S. G. (Trustee)");
    setFormReadTime("5 min read");
    setFormCoverImage("soil");
    setFormSummary("");
    setFormContent("");
    setFormError(null);
    setShowFormModal(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormAuthor(post.author);
    setFormReadTime(post.readTime);
    setFormCoverImage(post.coverImage);
    setFormSummary(post.summary);
    setFormContent(post.content);
    setFormError(null);
    setShowFormModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const payload: BlogPost = {
      id: editingPost ? editingPost.id : `blog-${Date.now()}`,
      title: formTitle,
      category: formCategory,
      author: formAuthor,
      date: editingPost ? editingPost.date : new Date().toISOString().split("T")[0],
      readTime: formReadTime,
      coverImage: formCoverImage,
      summary: formSummary,
      content: formContent
    };

    try {
      const response = await fetch("/api/blogs", {
        method: editingPost ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        await refreshBlogsFromServer();
        setShowFormModal(false);
        alert(editingPost ? "Article upgraded successfully!" : "New article published successfully!");
      } else {
        setFormError(data.error || "Execution failed.");
      }
    } catch (err) {
      setFormError("Communication error with server database.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this publication?")) return;

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        await refreshBlogsFromServer();
        alert("Publication removed successfully.");
      } else {
        const data = await response.json();
        alert(`Deletion error: ${data.error}`);
      }
    } catch (err) {
      alert("Network exception trying to delete post.");
    }
  };

  // Filter and search
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "all" ||
      b.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [
    { name: "All Articles", key: "all" },
    { name: "Agriculture", key: "agriculture" },
    { name: "Education", key: "education" },
    { name: "Women Empowerment", key: "women empowerment" },
    { name: "Health", key: "health" },
    { name: "Environment", key: "environment" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-24 text-stone-900">
      
      {/* Dynamic Title Header Banner */}
      <section className="bg-emerald-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-emerald-900/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-500 bg-amber-450/10 px-3 py-1 rounded-full border border-amber-400/20">
              Trust Press & Operations Feed
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
              Trust Editorial Blog
            </h1>
            <p className="text-emerald-250/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Read scientific farming guides, AI technology bootcamps insights, and operational updates direct from the headquarters of Raita Mitra Social Trust in Hubballi.
            </p>
          </div>

          {/* If Logged in Trustee, render console shortcut */}
          {isAdminLoggedIn ? (
            <button
              onClick={handleOpenCreate}
              className="cursor-pointer bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs px-5 py-3.5 rounded-xl shadow-md inline-flex items-center space-x-2 transition-all shrink-0 hover:scale-101 border border-transparent font-mono"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish New Post</span>
            </button>
          ) : (
            <button
              onClick={openAdminPortal}
              className="cursor-pointer bg-white/10 hover:bg-white/15 text-stone-200 text-[10px] font-mono border border-white/20 px-4 py-2 rounded-xl inline-flex items-center space-x-1.5 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Console Access</span>
            </button>
          )}
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Search Input and Categories filter drawer */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs">
          
          {/* Search Box wrapper */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4.5 h-4.5" />
            <input
              type="text"
              placeholder="Search reports, authors, crops guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-50/80 border border-stone-250 rounded-xl py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-emerald-700/10 focus:outline-hidden text-xs font-medium"
            />
          </div>

          {/* Quick filter lists */}
          <div className="flex flex-wrap gap-2 items-center">
            {uniqueCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`cursor-pointer px-4 py-2 text-xs rounded-lg transition-all font-semibold ${
                  selectedCategory === cat.key
                    ? "bg-emerald-800 text-white"
                    : "bg-stone-50/60 text-stone-600 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length === 0 ? (
            <div className="col-span-full text-center py-24 bg-white border border-stone-200 rounded-3xl space-y-3">
              <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="font-display font-bold text-stone-850">No publications matched</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
                We couldn&apos;t find any articles matching your filters. Try clearing your search key or selecting &ldquo;All Articles&rdquo;.
              </p>
            </div>
          ) : (
            filteredBlogs.map((b) => {
              const coverImg = getCoverImageAsset(b.coverImage);
              return (
                <motion.article
                  layout
                  key={b.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="relative">
                    {/* Cover Wrap */}
                    <div className="relative h-48 sm:h-52 w-full bg-stone-150">
                      <Image
                        src={coverImg}
                        alt={b.title}
                        fill
                        className="object-cover group-hover:scale-101 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-emerald-800 text-white text-[9px] font-extrabold uppercase font-mono tracking-wider px-2.5 py-1 rounded-full border border-emerald-700/80">
                        {b.category}
                      </div>

                      {/* Trustee commands shortcut overlay context */}
                      {isAdminLoggedIn && (
                        <div className="absolute top-4 right-4 flex space-x-1.5">
                          <button
                            onClick={() => handleOpenEdit(b)}
                            className="bg-white hover:bg-stone-50 p-1.5 rounded-full text-stone-700 border border-stone-250 shadow transition-all scale-95"
                            title="Edit Publication"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(b.id)}
                            className="bg-red-50 hover:bg-red-105 p-1.5 rounded-full text-red-650 border border-red-200 shadow transition-all scale-95"
                            title="Delete Publication"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Content text metadata */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-3 text-[10px] font-semibold text-stone-400 font-mono">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{b.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{b.readTime}</span>
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-stone-950 text-base sm:text-lg hover:text-emerald-850 transition-colors line-clamp-2 leading-snug">
                        {b.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-550 leading-relaxed line-clamp-3">
                        {b.summary}
                      </p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="px-6 pb-6 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-400 font-mono">
                      By {b.author.split(" (")[0]}
                    </span>
                    <Link
                      href={`/blog/${b.id}`}
                      className="cursor-pointer text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center space-x-1 transition-all"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </motion.article>
              );
            })
          )}
        </div>

      </main>

      {/* Persistent Publish Form Overlay Modal */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-55 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-stone-250 shadow-2xl mt-10 mb-10"
            >
              <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
                <span className="font-display font-bold text-xs uppercase tracking-widest font-mono">
                  {editingPost ? "Edit Existing Report" : "Publish Dynamic Trust Report"}
                </span>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="cursor-pointer p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Article Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter scientific farming or digital literacy news title..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-stone-500/10 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Category Division</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-stone-500/10 focus:outline-hidden"
                    >
                      <option>Agriculture</option>
                      <option>Education</option>
                      <option>Women Empowerment</option>
                      <option>Health</option>
                      <option>Environment</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Author Name / Credit</label>
                    <input
                      type="text"
                      required
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-stone-500/10 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Estimated Read Period</label>
                    <input
                      type="text"
                      required
                      value={formReadTime}
                      onChange={(e) => setFormReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-stone-500/10 focus:outline-hidden font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Cover Picture Key</label>
                    <select
                      value={formCoverImage}
                      onChange={(e) => setFormCoverImage(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-stone-500/10 focus:outline-hidden font-mono"
                    >
                      <option value="soil">Soil & Crop Diagnostics Workshop (Wheat Fields)</option>
                      <option value="edu">Rural digital computer lab (Students)</option>
                      <option value="women">Women Self-Help Group microenterprise (Ledgers)</option>
                      <option value="water">Community Rainwater harvesting dam</option>
                      <option value="hero">Karnataka Farmer fields (Lush Green)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Brief Summary</label>
                  <textarea
                    rows={2}
                    required
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    placeholder="Provide a small, high-impact description matching search list card previews..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-stone-500/10 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Main Publication Content (Supports Markdown)</label>
                    <span className="text-[10px] text-stone-400 font-mono tracking-wider">### Heading, *Italics*, 1. Numbered checklists</span>
                  </div>
                  <textarea
                    rows={8}
                    required
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Draft complete details..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-stone-500/10 focus:outline-hidden font-mono"
                  />
                </div>

                {formError && (
                  <p className="text-xs font-bold text-red-700 bg-red-50 p-2 border border-red-200 rounded text-center">
                    {formError}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="cursor-pointer bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs py-2.5 px-5 rounded-lg"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="cursor-pointer bg-emerald-850 hover:bg-emerald-900 text-white font-bold text-xs py-2.5 px-6 rounded-lg transition-all"
                  >
                    {formLoading ? "Publishing..." : editingPost ? "Save Changes" : "Publish to Server"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
