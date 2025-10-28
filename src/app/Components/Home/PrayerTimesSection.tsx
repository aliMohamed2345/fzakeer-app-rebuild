"use client";

import { motion } from "framer-motion";
import { FaMosque } from "react-icons/fa";
import {
  WiSunrise,
  WiDaySunny,
  WiCloudy,
  WiSunset,
  WiNightClear,
} from "react-icons/wi";
import { prayerTimeDescription } from "@/app/Data/Data";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
const PrayerTimesSection = () => {
  const prayerIcons = {
    Fajr: <WiSunrise className="text-primary w-10 h-10" />,
    Dhuhr: <WiDaySunny className="text-primary w-10 h-10" />,
    Asr: <WiCloudy className="text-primary w-10 h-10" />,
    Maghrib: <WiSunset className="text-primary w-10 h-10" />,
    Isha: <WiNightClear className="text-primary w-10 h-10" />,
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section
      id="prayer-times"
      className="py-20 px-4 bg-background text-foreground"
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
            <FaMosque className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-2">مواقيت الصلاة</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مواقيت الصلاة تحدد وفقاً لموقعك الجغرافي، وتشمل خمس صلوات يومية تبدأ
            بالفجر وتنتهي بالعشاء. تعرف على أهميتها وأوقاتها التقريبية.
          </p>
        </motion.div>

        {/* Descriptive Static Cards */}
        <motion.div
          className="max-w-3xl mx-auto bg-card rounded-2xl border border-border shadow-lg p-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
            className="flex flex-col gap-6 mt-6"
          >
            {prayerTimeDescription.map((prayer) => (
              <motion.div
                key={prayer.name}
                variants={itemVariants}
                className="flex items-center justify-between gap-2 bg-muted/30 border border-border rounded-xl py-6 px-2 hover:shadow-lg hover:border-primary hover:-translate-y-1 active:shadow-lg active:border-primary active:-translate-y-1 transition-all cursor-pointer"
              >
                <p className="text-muted-foreground text-xs sm:text-base mt-1 ">
                  {prayer.desc}
                </p>
                <div className="flex gap-2">
                  <h3 className="text-sm sm:text-xl font-semibold mt-2 ">
                    {prayer.name}
                  </h3>

                  <span className="hidden sm:block">
                    {
                      prayerIcons[
                        prayer.name === "الفجر"
                          ? "Fajr"
                          : prayer.name === "الظهر"
                          ? "Dhuhr"
                          : prayer.name === "العصر"
                          ? "Asr"
                          : prayer.name === "المغرب"
                          ? "Maghrib"
                          : "Isha"
                      ]
                    }
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Link
            className="flex items-center w-36 mx-auto mt-6 gap-2 bg-primary text-primary-foreground justify-center px-6 py-3 rounded-full font-semibold hover:bg-secondary active:bg-secondary transition-all group cursor-pointer"
            href={`/prayer-times`}
          >
            عرض المزيد
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PrayerTimesSection;
