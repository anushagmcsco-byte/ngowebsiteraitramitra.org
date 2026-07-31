"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  X, 
  PlusCircle, 
  Edit2, 
  Trash2, 
  UploadCloud, 
  Lock, 
  Sparkles, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Play,
  Video
} from "lucide-react";
import { useLayout } from "@/components/LayoutShell";
import { GalleryItem, getGalleryImage } from "@/lib/gallery";
import eduImg from "../../src/assets/images/rural_digital_education_1779872087959.png";

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
        id="youtube-player"
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
      id="html5-video-player"
      src={cleanUrl}
      controls
      autoPlay
      className="w-full h-full object-contain bg-black"
    />
  );
}

export default function GalleryPage() {
  const { isAdminLoggedIn, openAdminPortal } = useLayout();
  
  // Gallery active items list
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [galleryCategory, setGalleryCategory] = useState<string>("all");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [mediaTypeFilter, setMediaTypeFilter] = useState<"image" | "video">("image");

  // Administrative Form Modal states
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // New Admin Form State
  const [formTitle, setFormTitle] = useState<string>("");
  const [formCategory, setFormCategory] = useState<"agriculture" | "education" | "women" | "environment">("agriculture");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formLocation, setFormLocation] = useState<string>("");
  
  // Dual-upload fields
  const [formType, setFormType] = useState<"image" | "video">("image");
  const [imageType, setImageType] = useState<"upload" | "web">("upload");
  const [formBase64, setFormBase64] = useState<string>("");
  const [formWebUrl, setFormWebUrl] = useState<string>("soil");
  
  const [formVideoUrl, setFormVideoUrl] = useState<string>("");
  const [videoType, setVideoType] = useState<"upload" | "web">("web");
  
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Categories for render
  const categories = [
    { name: "All Projects", key: "all" },
    { name: "🌾 Agriculture", key: "agriculture" },
    { name: "🤖 Education", key: "education" },
    { name: "👩🤝👩 Women SHG", key: "women" },
    { name: "🌱 Environment", key: "environment" }
  ];

  // Load from API on mount
  const fetchGalleryItems = async (showLoadingOverlay = false) => {
    if (showLoadingOverlay) {
      setLoading(true);
    }
    try {
      const response = await fetch("/api/gallery");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data);
        }
      } else {
        throw new Error("Could not retrieve gallery list from server engine.");
      }
    } catch (err: any) {
      setError(err?.message || "Internal interface transmission error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchGalleryItems(false);
    }, 0);
  }, []);

  // Handle local image file loading to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      setFormError("The selected file is too large (max limit is 1.5MB to preserve data allocations).");
      return;
    }

    setFormError(null);
    setImageLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormBase64(reader.result as string);
      setImageLoading(false);
    };
    reader.onerror = () => {
      setFormError("Failed to convert image media.");
      setImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle local video file loading to base64
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setFormError("The selected video file is too large (max limit is 10MB to preserve memory allocation). We recommend uploading a YouTube or Vimeo link instead.");
      return;
    }

    setFormError(null);
    setImageLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormVideoUrl(reader.result as string);
      setImageLoading(false);
    };
    reader.onerror = () => {
      setFormError("Failed to import video file.");
      setImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Open creation dialog
  const handleOpenCreate = () => {
    setFormMode("create");
    setEditingId(null);
    setFormTitle("");
    setFormCategory("agriculture");
    setFormDescription("");
    setFormLocation("");
    setFormType("image");
    setImageType("upload");
    setFormBase64("");
    setFormWebUrl("soil");
    setFormVideoUrl("");
    setVideoType("web");
    setFormError(null);
    setFormSuccess(false);
    setShowFormModal(true);
  };

  // Open editing dialog
  const handleOpenEdit = (item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop trigger of selected card modal
    setFormMode("edit");
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormLocation(item.location);
    
    const isVideo = item.type === "video";
    setFormType(isVideo ? "video" : "image");
    
    if (item.image.startsWith("data:") || item.image.startsWith("http")) {
      setImageType("web");
      setFormWebUrl(item.image);
      setFormBase64("");
    } else {
      setImageType("web");
      setFormWebUrl(item.image); // presets soil, edu, etc.
      setFormBase64("");
    }

    if (isVideo) {
      setFormVideoUrl(item.videoUrl || "");
      if (item.videoUrl?.startsWith("data:")) {
        setVideoType("upload");
      } else {
        setVideoType("web");
      }
    } else {
      setFormVideoUrl("");
      setVideoType("web");
    }
    
    setFormError(null);
    setFormSuccess(false);
    setShowFormModal(true);
  };

  // Handle deletion
  const handleDeleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you absolutely sure you want to delete this media item from the active gallery? This is irreversible.")) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
        alert("Gallery media item successfully deleted.");
      } else {
        alert("Failed to submit deletion request.");
      }
    } catch (err) {
      alert("Error occurred while deleting index reference.");
    }
  };

  // Submit form handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    let finalImage = imageType === "upload" ? formBase64 : formWebUrl;
    if (formType === "video" && !finalImage) {
      // If uploading an video and no specific thumbnail is supplied, assign category cover
      if (formCategory === "agriculture") finalImage = "soil";
      else if (formCategory === "education") finalImage = "edu";
      else if (formCategory === "women") finalImage = "women";
      else finalImage = "water";
    }

    if (!finalImage && formType === "image") {
      setFormError("You must provide an image asset (either file upload or preset seed reference).");
      return;
    }

    if (formType === "video" && !formVideoUrl.trim()) {
      setFormError("You must provide a video link or upload a video file.");
      return;
    }

    if (!formTitle.trim()) {
      setFormError("Title field is mandatory.");
      return;
    }

    const payload: GalleryItem = {
      id: formMode === "create" ? `gal-${Date.now()}` : (editingId as string),
      title: formTitle.trim(),
      category: formCategory,
      description: formDescription.trim(),
      location: formLocation.trim() || "Karnataka, India",
      image: finalImage,
      type: formType,
      videoUrl: formType === "video" ? formVideoUrl.trim() : undefined
    };

    try {
      const response = await fetch("/api/gallery", {
        method: formMode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setFormSuccess(true);
        setTimeout(() => {
          setShowFormModal(false);
          fetchGalleryItems();
        }, 1000);
      } else {
        const errorData = await response.json();
        setFormError(errorData?.error || "Problem transmitting media credentials.");
      }
    } catch (err) {
      setFormError("Communication blockage with server registry.");
    }
  };

  return (
    <div id="gallery-root-container" className="min-h-screen bg-stone-50 text-stone-900 pb-24">
      
      {/* Title Header Banner */}
      <section id="gallery-header-banner" className="bg-emerald-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={eduImg}
            alt="Field Project Media and Education Gallery"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-900/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              {/* Breadcrumbs */}
              <nav className="flex items-center space-x-2 text-xs text-emerald-300/80 font-mono mb-4">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-amber-400 font-bold">Gallery</span>
              </nav>

              <span className="inline-flex items-center space-x-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Visual Footprints</span>
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight mt-3">
                Project Gallery
              </h1>
              <p className="text-emerald-200/90 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
                Real-world project updates from rural Karnataka coordinator offices. Each picture portrays local farmers, youth, and cooperatives actively receiving educational and material aid.
              </p>
            </div>

            {/* Admin trigger tools directly inside the banner */}
            <div>
              {isAdminLoggedIn ? (
                <button
                  id="admin-add-media-button"
                  onClick={handleOpenCreate}
                  className="cursor-pointer bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs px-5 py-3.5 rounded-xl shadow-md inline-flex items-center space-x-2 transition-all hover:scale-101 border border-transparent font-mono uppercase tracking-wider"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Upload Gallery Media</span>
                </button>
              ) : (
                <button
                  id="admin-guest-access-button"
                  onClick={openAdminPortal}
                  className="cursor-pointer bg-white/10 hover:bg-white/15 text-stone-200 text-xs tracking-wider font-mono border border-white/20 px-4 py-3 rounded-xl inline-flex items-center space-x-2 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Trustee Portal Access</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Admin Action Bar Alert (Visible only when logged in as admin) */}
      {isAdminLoggedIn && (
        <div id="admin-session-notice-bar" className="bg-amber-50 border-y border-amber-200 px-4 py-3">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-2 text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="font-semibold">
                You are authenticated as a Trust Administrator. Hover on any gallery item card to edit details or delete it.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Cards Container */}
      <main id="gallery-main-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation Tab selection for Photos vs Videos */}
        <div id="gallery-media-tabs" className="flex items-center justify-center space-x-4 mb-8">
          <button
            onClick={() => setMediaTypeFilter("image")}
            className={`cursor-pointer px-6 py-2.5 rounded-2xl flex items-center space-x-2 text-xs font-mono tracking-wider font-extrabold uppercase border transition-all shadow-2xs ${
              mediaTypeFilter === "image"
                ? "bg-emerald-950 text-white border-emerald-950 scale-102"
                : "bg-white text-stone-600 border-stone-250 hover:border-stone-400"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photo Gallery ({items.filter(item => item.type !== "video").length})</span>
          </button>
          
          <button
            onClick={() => setMediaTypeFilter("video")}
            className={`cursor-pointer px-6 py-2.5 rounded-2xl flex items-center space-x-2 text-xs font-mono tracking-wider font-extrabold uppercase border transition-all shadow-2xs ${
              mediaTypeFilter === "video"
                ? "bg-emerald-950 text-emerald-400 border-emerald-950 scale-102"
                : "bg-white text-stone-600 border-stone-250 hover:border-stone-400"
            }`}
          >
            <Video className="w-4 h-4 text-emerald-500" />
            <span>Video Hub ({items.filter(item => item.type === "video").length})</span>
          </button>
        </div>

        {/* Navigation Filter Buttons */}
        <div id="gallery-category-filters" className="flex flex-wrap items-center justify-center gap-2.5 mb-10 pb-4 border-b border-stone-200">
          {categories.map((cat) => (
            <button
              id={`filter-btn-${cat.key}`}
              key={cat.key}
              onClick={() => setGalleryCategory(cat.key)}
              className={`cursor-pointer text-xs font-bold px-4.5 py-2.5 rounded-full transition-all border ${
                galleryCategory === cat.key
                  ? "bg-emerald-850 text-white border-emerald-850 shadow-sm scale-102"
                  : "bg-white text-stone-600 border-stone-250 hover:border-emerald-700 hover:text-emerald-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Catalog Handling States */}
        {loading ? (
          <div className="text-center py-24">
            <div className="w-10 h-10 border-4 border-emerald-850 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-stone-500 font-mono">Synchronizing live media logs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50/50 border border-red-200 rounded-3xl p-8 max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-red-700 mx-auto mb-3" />
            <p className="text-sm font-bold text-red-900 mb-1">Catalog Connection Lost</p>
            <p className="text-xs text-stone-500 leading-normal">{error}</p>
          </div>
        ) : items.filter((item) => {
            const itemType = item.type === "video" ? "video" : "image";
            if (itemType !== mediaTypeFilter) return false;
            return galleryCategory === "all" || item.category === galleryCategory;
          }).length === 0 ? (
          <div className="text-center py-20 bg-stone-100/50 border border-dashed border-stone-300 rounded-3xl p-8 max-w-md mx-auto">
            {mediaTypeFilter === "video" ? (
              <Video className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            ) : (
              <ImageIcon className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            )}
            <p className="text-sm font-bold text-stone-700 mb-1">No media registered</p>
            <p className="text-xs text-stone-500">
              {mediaTypeFilter === "video" 
                ? "No video items found matching this category filter." 
                : "No photo items found matching this category filter."}
            </p>
          </div>
        ) : (
          /* Gallery Grid */
          <div id="gallery-cards-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {items
                .filter((item) => {
                  const itemType = item.type === "video" ? "video" : "image";
                  if (itemType !== mediaTypeFilter) return false;
                  return galleryCategory === "all" || item.category === galleryCategory;
                })
                .map((item) => {
                  const imageSrc = getGalleryImage(item.image);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      key={item.id}
                      onClick={() => setSelectedGalleryItem(item)}
                      className="cursor-pointer group relative bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all h-[360px] flex flex-col justify-end"
                    >
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-103 opacity-90"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent z-10" />
                        
                        {/* Interactive Play Video Circle Overlay */}
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center z-15">
                            <div className="bg-emerald-900/90 text-white p-4.5 rounded-full shadow-lg group-hover:scale-110 group-hover:bg-amber-450 group-hover:text-stone-950 transition-all border border-emerald-750/30">
                              <Play className="w-6 h-6 fill-current ml-0.5" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Administrative Floating Options */}
                      {isAdminLoggedIn && (
                        <div className="absolute top-3 right-3 z-30 flex items-center space-x-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            title="Edit Media Profile"
                            onClick={(e) => handleOpenEdit(item, e)}
                            className="cursor-pointer bg-white text-stone-900 hover:bg-emerald-50 hover:text-emerald-800 p-2 rounded-lg border border-stone-200/80 shadow-xs transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Delete Media"
                            onClick={(e) => handleDeleteItem(item.id, e)}
                            className="cursor-pointer bg-white text-red-700 hover:bg-red-50 p-2 rounded-lg border border-stone-200/80 shadow-xs transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <div className="relative z-20 p-6 text-white space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono font-extrabold tracking-widest text-amber-400 template-uppercase uppercase">
                          <span className="flex items-center space-x-1">
                            {item.type === "video" ? <Video className="w-3.5 h-3.5 mr-1" /> : null}
                            {item.category}
                          </span>
                          <span className="flex items-center space-x-1 font-mono">
                            <MapPin className="w-3 h-3 text-stone-300" />
                            <span>{item.location}</span>
                          </span>
                        </div>
                        <h4 className="font-display text-base font-bold leading-tight group-hover:text-amber-350 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        )}

      </main>

      {/* Dynamic Pop-up Modal Dialog for Selected Image / Video */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <div id="gallery-overlay-modal" className="fixed inset-0 z-55 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-stone-250 shadow-2xl relative"
            >
              <div className="relative h-64 sm:h-96 w-full bg-stone-950">
                {selectedGalleryItem.type === "video" ? (
                  <VideoPlayer url={selectedGalleryItem.videoUrl || ""} />
                ) : (
                  <Image
                    src={getGalleryImage(selectedGalleryItem.image)}
                    alt={selectedGalleryItem.title}
                    fill
                    className="object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Close Button overlay */}
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all z-20"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded">
                    Project Reference: {selectedGalleryItem.category}
                  </span>
                  
                  <div className="flex items-center space-x-1 text-xs text-stone-500 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{selectedGalleryItem.location}</span>
                  </div>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-stone-950">
                  {selectedGalleryItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2">
                  {selectedGalleryItem.description}
                </p>
                
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedGalleryItem(null)}
                    className="cursor-pointer bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs py-2 px-5 rounded-lg"
                  >
                    Close View
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Trustee Administrative Panel Modal Form */}
      <AnimatePresence>
        {showFormModal && (
          <div id="admin-gallery-form-modal" className="fixed inset-0 z-55 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl mt-8 mb-8 overflow-hidden max-w-lg w-full border border-stone-250 shadow-2xl relative"
            >
              <div className="p-6 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display text-sm font-bold tracking-wider uppercase">
                    {formMode === "create" ? "Add Gallery Release" : "Modify Gallery Item"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="cursor-pointer text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {formSuccess && (
                  <div className="bg-emerald-50 border border-emerald-250 text-emerald-900 p-3.5 rounded-xl text-xs text-center font-bold flex items-center justify-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Operational database catalog updated! Closing...</span>
                  </div>
                )}

                {/* Release Type Toggler */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wider font-mono">
                    Release Media Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormType("image")}
                      className={`cursor-pointer py-2 text-center text-xs font-bold rounded-xl transition-all border ${
                        formType === "image"
                          ? "bg-stone-900 border-stone-900 text-white shadow-xs"
                          : "bg-stone-50 border-stone-300 text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      🏞️ Photo / Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormType("video")}
                      className={`cursor-pointer py-2 text-center text-xs font-bold rounded-xl transition-all border ${
                        formType === "video"
                          ? "bg-stone-900 border-stone-900 text-white shadow-xs"
                          : "bg-stone-50 border-stone-300 text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      🎥 Campaign Video
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wider font-mono">
                      Project Release Title
                    </label>
                    <input
                      type="text"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden"
                      placeholder="e.g. Scientific Crop Diagnostics in Dharwad"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wider font-mono">
                      Welfare Pillar Category
                    </label>
                    <select
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                    >
                      <option value="agriculture">🌾 Agriculture</option>
                      <option value="education">🤖 Education</option>
                      <option value="women">👩🤝👩 Women SHG</option>
                      <option value="environment">🌱 Environment</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wider font-mono">
                      Karnataka Location
                    </label>
                    <input
                      type="text"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden"
                      placeholder="e.g. Gokul, Hubballi"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wider font-mono">
                    Afield Descriptive Details
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden"
                    placeholder="Short description detailing active progress or beneficiary impacts."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    required
                  />
                </div>

                {/* Secure Dynamic Video Resource Configuration System */}
                {formType === "video" && (
                  <div className="space-y-2 border-t border-stone-150 pt-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wider font-mono">
                        Video Resource Method
                      </label>
                      <div className="flex space-x-1.5">
                        <button
                          type="button"
                          onClick={() => setVideoType("upload")}
                          className={`px-3 py-1 text-[9px] font-bold rounded-md font-mono transition-colors ${
                            videoType === "upload" 
                              ? "bg-stone-900 text-white" 
                              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                          }`}
                        >
                          Device Video File
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoType("web")}
                          className={`px-3 py-1 text-[9px] font-bold rounded-md font-mono transition-colors ${
                            videoType === "web" 
                              ? "bg-stone-900 text-white" 
                              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                          }`}
                        >
                          YouTube or Web URL
                        </button>
                      </div>
                    </div>

                    {videoType === "upload" ? (
                      <div className="space-y-2">
                        <div 
                          onClick={() => videoInputRef.current?.click()}
                          className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center cursor-pointer hover:border-emerald-750 hover:bg-emerald-50/20 transition-all group"
                        >
                          <input
                            type="file"
                            ref={videoInputRef}
                            onChange={handleVideoFileChange}
                            accept="video/*"
                            className="hidden"
                          />
                          {formVideoUrl && formVideoUrl.startsWith("data:") ? (
                            <div className="space-y-2">
                              <div className="relative h-20 w-36 mx-auto rounded-lg overflow-hidden border border-stone-200 bg-stone-900 flex items-center justify-center">
                                <Video className="w-8 h-8 text-emerald-400" />
                              </div>
                              <p className="text-[10px] font-mono font-semibold text-emerald-800">
                                ✓ Video File Loaded (Click to pick other)
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <UploadCloud className="w-7 h-7 text-stone-400 group-hover:text-emerald-700 mx-auto transition-colors" />
                              <p className="text-xs font-bold text-stone-700">Choose Device Video File</p>
                              <p className="text-[9px] text-stone-400 font-mono">MP4, WebM - max 10MB allocation</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-mono focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden"
                          placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or direct link"
                          value={formVideoUrl}
                          onChange={(e) => setFormVideoUrl(e.target.value)}
                        />
                        <span className="text-[9px] text-stone-400 block leading-normal">
                          Accepts YouTube URLs, Vimeo URLs, and direct links to public static .mp4 streams.
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Secure Dynamic Media Image Selection System */}
                <div className="space-y-2 border-t border-stone-150 pt-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wider font-mono">
                      {formType === "video" ? "Thumbnail Cover Setting" : "Image Content Method"}
                    </label>
                    <div className="flex space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setImageType("upload")}
                        className={`px-3 py-1 text-[9px] font-bold rounded-md font-mono transition-colors ${
                          imageType === "upload" 
                            ? "bg-stone-900 text-white" 
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        Device File Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageType("web")}
                        className={`px-3 py-1 text-[9px] font-bold rounded-md font-mono transition-colors ${
                          imageType === "web" 
                            ? "bg-stone-900 text-white" 
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        Custom URL / Seed
                      </button>
                    </div>
                  </div>

                  {imageType === "upload" ? (
                    <div className="space-y-2">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center cursor-pointer hover:border-emerald-750 hover:bg-emerald-50/20 transition-all group"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        {formBase64 ? (
                          <div className="space-y-2">
                            <div className="relative h-24 w-40 mx-auto rounded-lg overflow-hidden border border-stone-200">
                              <img
                                src={formBase64}
                                alt="Pre-render"
                                className="object-cover w-full h-full"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <p className="text-[10px] font-mono font-semibold text-emerald-800">
                              ✓ Thumbnail Loaded Successfully (Click to choose other)
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <UploadCloud className="w-7 h-7 text-stone-400 group-hover:text-emerald-700 mx-auto transition-colors" />
                            <p className="text-xs font-bold text-stone-700">
                              {formType === "video" ? "Choose Custom Thumbnail Image" : "Choose Device Image File"}
                            </p>
                            <p className="text-[9px] text-stone-400 font-mono">PNG, Jpeg - max 1.5MB allocation</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="space-y-1">
                        <input
                          type="text"
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-mono focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden"
                          placeholder="Image Web URL, or default seeds: soil, edu, women, water, hero"
                          value={formWebUrl}
                          onChange={(e) => setFormWebUrl(e.target.value)}
                        />
                        <span className="text-[9px] text-stone-400 block max-w-sm leading-normal">
                          {formType === "video" 
                            ? "Tip: Leave default seed to automatically match welfare category, or specify external URL."
                            : "Tip: Use generic seeds like `soil`, `edu`, `women`, `water`, `hero` or pass in absolute external image address."}
                        </span>
                      </div>

                      {/* Seed preset previews */}
                      <div className="flex gap-1.5 flex-wrap">
                        {["soil", "edu", "women", "water", "hero"].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormWebUrl(s)}
                            className={`px-2.5 py-1 text-[9px] rounded-md font-mono border transition-all uppercase ${
                              formWebUrl === s 
                                ? "bg-amber-100 text-amber-900 border-amber-300 font-bold" 
                                : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-150 flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="cursor-pointer flex-1 py-2.5 text-center bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-all"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    disabled={imageLoading || formSuccess}
                    className="cursor-pointer flex-1 py-2.5 text-center bg-emerald-850 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-1.5"
                  >
                    {imageLoading ? (
                      <span>Loading Media...</span>
                    ) : (
                      <span>{formMode === "create" ? "Save Release" : "Publish Update"}</span>
                    )}
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
