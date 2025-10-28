"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import bismillah from "../../../../public/bismillah.png";
import heroBackground from "../../../../public/hero-background.jpg";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gradient-primary-start to-gradient-primary-end"
      style={{
        backgroundImage: `url(${heroBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Parent container with staggered children animation */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          {/* Floating Bismillah image */}
          <motion.div
            className="mb-8"
            animate={{
              y: [0, -15, 0], // Moves up 15px, then back down
            }}
            transition={{
              duration: 3, // 3 seconds per cycle
              ease: "easeInOut",
              repeat: Infinity, // Infinite loop
            }}
          >
            <Image
              src={bismillah}
              alt="بسم الله الرحمن الرحيم"
              className="w-48 h-48 mx-auto"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
            }}
          >
            فَذْكُر
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-white/95 leading-relaxed mb-8 text-center drop-shadow-md"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
            }}
          >
            موقع متكامل يضم كل ما يحتاجه المسلم من مصادر قيّمة للقرآن الكريم
            والسنة النبوية الشريفة، بالإضافة إلى معرفة مواقيت الصلاة الدقيقة
            وأذكار الصباح والمساء
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 pointer-events-none" />
    </section>
  );
};

export default Hero;
