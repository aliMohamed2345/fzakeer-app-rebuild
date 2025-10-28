"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineStop } from "react-icons/ai";

const NoSavedAyahs = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 min-h-[70vh]">
      {/* Icon Section */}
      <div className="bg-primary/20 text-primary rounded-full flex items-center justify-center shadow-sm mb-6 w-36 h-36 sm:w-48 sm:h-48 animate-fade-in">
        <AiOutlineStop size={100} className="drop-shadow-md" />
      </div>

      {/* Title */}
      <h2 className="text-primary font-bold mb-3 text-3xl sm:text-5xl tracking-wide">
        لا توجد آيات محفوظة
      </h2>

      {/* Description */}
      <p className="text-muted-foreground sm:text-xl text-base mb-6 leading-relaxed max-w-[600px]">
        لم تقم بحفظ أي آية حتى الآن. يمكنك تصفح القرآن الكريم واختيار الآيات
        التي تود حفظها لتكون دائمًا قريبة من قلبك وتستعيدها متى شئت.
      </p>

      {/* Button */}
      <Link
        href="/quran/reading-quran"
        className="inline-flex items-center gap-2 border border-primary text-primary bg-muted hover:bg-primary hover:text-background active:bg-primary active:text-background transition-all duration-300 px-6 py-3 rounded-full shadow-md font-medium text-lg"
      >
        <span>تصفح القرآن الكريم</span>
      </Link>
    </div>
  );
};

export default NoSavedAyahs;
