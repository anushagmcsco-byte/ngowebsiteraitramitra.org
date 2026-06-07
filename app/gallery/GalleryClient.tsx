"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, X, Info, HelpCircle } from "lucide-react";

// Image assets
import soilImg from "../../src/assets/images/soil_workshop_1779872711266.png";
import eduImg from "../../src/assets/images/rural_digital_education_1779872087959.png";
import womenImg from "../../src/assets/images/women_empowerment_1779872106993.png";
import waterImg from "../../src/assets/images/water_dam_1779872733604.png";
import heroImg from "../../src/assets/images/karnataka_farmer_hero_1779872061305.png";

const defaultGallery = [
  {
    id: "gal-1",
    title: "Organic Yield & Soil Conditioning Workshop",
    category: "agriculture",
    description: "Empowering Dharwad smallholders with microbial soil-cards, bio-fertilizers, and high-yield organic techniques.",
    image: soilImg,
    location: "Hubballi Rural, Dharwad"
  },
  {
    id: "gal-2",
    title: "Primary Digital & Computer Science Lab",
    category: "education",
    description: "Rural public school youth logging onto computational modules, basic tech skills, and digital tools.",
    image: eduImg,
    location: "Belagavi District"
  },
  {
    id: "gal-3",
    title: "Women Microenterprise Cooperative Training",
    category: "women",
    description: "Developing vocational skills, local handicrafts, and ledger-keeping savings for Self-Help Groups (SHGs).",
    image: womenImg,
    location: "Haveri Region"
  },
  {
    id: "gal-4",
    title: "Community Rainwater Harvesting Dam",
    category: "environment",
    description: "Groundwater recharge dams built near drier farming sub-sectors to preserve high-yield crops under monsoon delays.",
    image: waterImg,
    location: "Koppal District"
  },
  {
    id: "gal-5",
    title: "Climate Resilient Crop Diagnostics",
    category: "agriculture",
    description: "Marginal farmers checking leaf-tissue quality under organic advisory campaigns in Hubballi.",
    image: heroImg,
    location: "HBL Suburbs, Karnataka"
  }
];

export default function GalleryPage() {
  const [galleryCategory, setGalleryCategory] = useState<string>("all");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<any | null>(null);

  const categories = [
    { name: "All Projects", key: "all" },
    { name: "🌾 Agriculture", key: "agriculture" },
    { name: "🤖 Education", key: "education" },
    { name: "👩🤝👩 Women SHG", key: "women" },
    { name: "🌱 Environment", key: "environment" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-24">
      
      {/* Title Header Banner */}
      <section className="bg-emerald-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-emerald-900/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400 bg-amber-450/10 px-3 py-1 rounded-full border border-amber-400/20">
            Visual Footprints
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight mt-3">
            Our Project Gallery
          </h1>
          <p className="text-emerald-200/80 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
            Real-world project updates from rural Karnataka coordinator offices. Each picture portrays local farmers, youth, and cooperatives actively receiving educational and material aid.
          </p>
        </div>
      </section>

      {/* Filter and Cards Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 pb-4 border-b border-stone-200">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setGalleryCategory(cat.key)}
              className={`cursor-pointer text-xs font-bold px-4.5 py-2.5 rounded-full transition-all border ${
                galleryCategory === cat.key
                  ? "bg-emerald-800 text-white border-emerald-800 shadow-sm scale-102"
                  : "bg-white text-stone-600 border-stone-250 hover:border-emerald-700 hover:text-emerald-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {defaultGallery
              .filter((item) => galleryCategory === "all" || item.category === galleryCategory)
              .map((item) => (
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
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent z-10" />
                  </div>

                  <div className="relative z-20 p-6 text-white space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono font-extrabold tracking-widest text-amber-400 uppercase">
                      <span>{item.category}</span>
                      <span className="flex items-center space-x-1 font-mono">
                        <MapPin className="w-3 h-3 text-stone-300" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                    <h4 className="font-display text-base font-bold leading-tight group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

      </main>

      {/* Dynamic Pop-up Modal Dialog for Selected Image */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <div className="fixed inset-0 z-55 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-stone-250 shadow-2xl relative"
            >
              <div className="relative h-64 sm:h-96 w-full bg-stone-950">
                <Image
                  src={selectedGalleryItem.image}
                  alt={selectedGalleryItem.title}
                  fill
                  className="object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close Button overlay */}
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
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

                <p className="text-xs sm:text-sm text-stone-605 leading-relaxed pt-2">
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

    </div>
  );
}
