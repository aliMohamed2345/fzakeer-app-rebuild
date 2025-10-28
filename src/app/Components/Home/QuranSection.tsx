"use client";

import { useState } from "react";
import { motion, Variants, easeOut } from "framer-motion";
import { FaBookQuran } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { QuranSurahs } from "@/app/Data/Data";

const QuranSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = QuranSurahs.filter((surah) =>
    surah.name.includes(searchQuery)
  );

  // ✅ Type-safe Framer Motion variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section id="quran" className="py-20 px-4 bg-muted text-foreground">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FaBookQuran className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-3">القرآن الكريم</h2>
          <p className="text-lg text-muted-foreground">
            تجربة سهلة لتصفح السور والآيات مع تفسير واضح لكل آية
          </p>
        </motion.div>

        {/* Quran Surahs List */}
        <motion.div
          className="max-w-4xl mx-auto rounded-xl border border-border/40 bg-gradient-to-br from-card/50 to-card/20 shadow-[0_0_25px_rgba(0,0,0,0.15)] backdrop-blur-md p-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Search */}
          <motion.div variants={item} className="mb-6 relative">
            <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder={"ابحث عن سورة..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full h-11 rounded-md bg-background/70 border border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/60 focus:outline-none transition-all"
            />
          </motion.div>

          <motion.div
            className="max-h-[420px] overflow-y-auto space-y-3 pr-1"
            variants={container}
          >
            {filteredSurahs.map((surah) => (
              <motion.div key={surah.number} variants={item}>
                <Link
                  href={`/quran/reading-quran/surah/${surah.number}`}
                  className="block group bg-gradient-to-r from-background to-muted/10 border border-border/30 rounded-lg p-4 hover:shadow-lg hover:border-primary/40 active:shadow-lg active:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm sm:text-xl text-muted-foreground">
                      {surah.number} آية
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <h3 className="text-sm sm:text-xl font-semibold">{surah.name}</h3>
                      </div>
                      <span className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground font-bold group-hover:scale-105 group-active:scale-105 transition-transform">
                        {surah.number}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuranSection;
