"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { morningAzkar, eveningAzkar } from "@/app/Data/Data";
import Link from "next/link";

const AzkarSection = () => {
  const [activeTab, setActiveTab] = useState("morning");
  const currentAzkar = activeTab === "morning" ? morningAzkar : eveningAzkar;

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="azkar"
      className="py-20 px-4 bg-muted text-foreground transition-colors duration-500"
    >
      <div className="container mx-auto text-center">
        {/* Header */}
        <motion.div
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 mb-4">
            <GoBook className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-2">الأذكار</h2>
          <p className="text-lg text-muted-foreground">
            أذكار الصباح والمساء، لِسعادة القلب وذكر الله
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="max-w-4xl mx-auto bg-card rounded-2xl border border-border shadow-md p-6 text-right"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex w-full rounded-xl overflow-hidden border border-border">
              <button
                onClick={() => setActiveTab("morning")}
                className={`flex-1 px-6 py-3 text-xs sm:text-lg font-semibold transition cursor-pointer border-r border-border ${
                  activeTab === "morning"
                    ? "bg-primary/10 text-primary"
                    : "bg-transparent text-muted-foreground"
                }`}
              >
                أذكار الصباح
              </button>
              <button
                onClick={() => setActiveTab("evening")}
                className={`flex-1 px-6 py-3 text-xs sm:text-lg font-semibold transition cursor-pointer ${
                  activeTab === "evening"
                    ? "bg-primary/10 text-primary"
                    : "bg-transparent text-muted-foreground"
                }`}
              >
                أذكار المساء
              </button>
            </div>
          </div>

          {/* Animated Azkar List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col gap-5 "
              >
                {currentAzkar.map((zikr) => (
                  <motion.div
                    key={zikr.id}
                    variants={itemVariants}
                    layout
                    className="rounded-xl border border-border hover:border-primary hover:-translate-y-1 active:border-primary active:-translate-y-1 transition cursor-pointer bg-muted/40 p-6 flex flex-col sm:flex-row justify-between items-center gap-5 group"
                  >
                    <div className="flex-1">
                      <p
                        className="text-sm sm:text-xl font-semibold mb-3 leading-loose text-center sm:text-right group-hover:text-primary group-active:text-primary"
                        dir="rtl"
                      >
                        {zikr.arabic}
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground font-bold group-hover:scale-105 group-active:scale-105">
                      {zikr.count}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Button */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-secondary active:bg-secondary transition-all group cursor-pointer"
              href={`/azkar`}
            >
              عرض المزيد
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AzkarSection;
