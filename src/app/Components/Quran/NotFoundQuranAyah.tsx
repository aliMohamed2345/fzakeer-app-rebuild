"use client";
import React from "react";
import { AiOutlineStop } from "react-icons/ai";

const NotFoundQuranAyah = ({ Query }: { Query: string }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 min-h-[70vh]">
      {/* Icon Section */}
      <div className="bg-primary/20 text-primary rounded-full flex items-center justify-center shadow-sm mb-6 w-36 h-36 sm:w-48 sm:h-48 animate-fade-in">
        <AiOutlineStop size={100} className="drop-shadow-md" />
      </div>

      {/* Title */}
      <h2 className="text-primary font-bold mb-3 text-3xl sm:text-5xl tracking-wide">
       لا توجد نتائج
      </h2>

      {/* Description */}
      <p className="text-muted-foreground sm:text-xl text-base mb-6 leading-relaxed max-w-[600px]">
       لم يتم العثور على آية تطابق النص &quot;<b>{Query}</b>&quot;. يمكنك تجربة كلمات أخرى أو البحث بجزء من الآية لتظهر لك نتائج أدق .
      </p>
    </div>
  );
};

export default NotFoundQuranAyah;
