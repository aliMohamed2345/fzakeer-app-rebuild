"use client";

import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import { navData } from "@/app/Data/Data";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <footer className="w-full border-t-2 bg-muted border-primary/40 backdrop-blur-md text-foreground p-3 pt-5 mt-10 relative">
      <motion.div
        className="container mx-auto flex flex-col md:flex-row-reverse justify-between gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Brand Section */}
        <motion.div
          variants={item}
          className="flex flex-col items-center md:items-end text-center md:text-right"
        >
          <h2 className="text-2xl font-extrabold text-primary mb-3 tracking-widest">
            فَذْكُر
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed sm:text-xl">
            موقع متكامل يجمع القرآن الكريم، الحديث النبوي، والأذكار اليومية
            ليكون رفيقك الروحي في كل وقت.
          </p>
        </motion.div>

        {/* Main Navigation */}
        <motion.div
          variants={item}
          className="flex flex-col items-center md:items-end text-center md:text-right"
        >
          <h3 className="relative inline-block text-lg font-semibold text-primary mb-4 sm:text-2xl">
            الأقسام الرئيسية
            <span className="absolute bottom-[-6px] left-0 w-10 h-[2px] bg-primary rounded-full" />
          </h3>
          <ul className="space-y-3 text-muted-foreground">
            {navData.mainData.map((nav) => (
              <li key={nav.id}>
                <Link
                  href={nav.href}
                  className="hover:text-primary active:text-primary transition-colors duration-300 text-sm sm:text-xl"
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Quran Navigation */}
        <motion.div
          variants={item}
          className="flex flex-col items-center md:items-end text-center md:text-right"
        >
          <h3 className="relative inline-block text-lg font-semibold text-primary mb-4 sm:text-2xl">
            أقسام القرآن الكريم
            <span className="absolute bottom-[-6px] left-0 w-10 h-[2px] bg-primary rounded-full" />
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {navData.quranData.map((quran) => (
              <li key={quran.id}>
                <Link
                  href={quran.href}
                  className="hover:text-primary active:text-primary transition-colors duration-300 text-sm sm:text-xl"
                >
                  {quran.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        variants={item}
        className="mt-4 text-center text-muted-foreground text-sm sm:text-base"
      >
        © {currentYear} فَذْكُر — جميع الحقوق محفوظة
      </motion.div>
    </footer>
  );
};

export default Footer;
