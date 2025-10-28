"use client";

import { motion, Variants, easeOut } from "framer-motion";
import { GoBook } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { hadithSamples } from "@/app/Data/Data";
import Link from "next/link";

const HadithSection = () => {
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
    <section
      id="hadith"
      className="py-24 px-4 transition-colors duration-500 bg-background text-foreground relative overflow-hidden"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-background"></div>

      <div className="relative container mx-auto z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 mb-4">
            <GoBook className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-4xl font-extrabold mb-3 text-foreground">
            الحديث النبوي
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            اِسْتَكْشِفْ آلاف الأحاديث الصحيحة من كتب السنة النبوية الشريفة مثل
            صحيح البخاري وصحيح مسلم والمزيد.
          </p>
        </motion.div>

        {/* Main Card Container */}
        <motion.div
          className="max-w-5xl mx-auto rounded-2xl border border-border bg-card shadow-md backdrop-blur-sm p-8 transition-all duration-500
          "
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div variants={item} className="mb-10 text-right">
            <h3 className="text-2xl font-bold text-foreground mb-1">
              أحاديث مختارة
            </h3>
            <p className="text-muted-foreground">
              من كنوز السنة النبوية الشريفة
            </p>
          </motion.div>

          {/* Hadith Cards */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 gap-6 max-h-[480px] overflow-y-auto pr-2"
          >
            {hadithSamples.map((hadith) => (
              <motion.div
                key={hadith.id}
                variants={item}
                className="rounded-xl border border-border bg-muted/40 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-lg active:shadow-lg active:border-primary active:text-primary active:-translate-y-1 transition-all flex flex-col justify-between p-5 cursor-pointer
                "
              >
                <p className="text-xs sm:text-lg font-semibold text-right leading-loose mb-4">
                  {hadith.arabic}
                </p>
                <p className="text-sm text-primary font-medium">
                  {hadith.reference}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Button */}
          <motion.div variants={item} className="mt-10 flex justify-center">
            <Link
              href="/hadith"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-secondary active:bg-secondary transition-all group cursor-pointer"
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

export default HadithSection;
