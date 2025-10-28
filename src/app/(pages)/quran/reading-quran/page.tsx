"use client";

import { QuranJuz, QuranSurahs } from "@/app/Data/Data";
import Link from "next/link";
import { useState, useMemo } from "react";
import { IoClose } from "react-icons/io5";

const ReadingQuran = () => {
  const [currentMode, setCurrentMode] = useState<"surah" | "juz">("surah");
  const [searchSurah, setSearchSurah] = useState("");

  // 🧠 Filter surahs dynamically based on search text
  const filteredSurahs = useMemo(() => {
    const query = searchSurah.trim();
    if (!query) return QuranSurahs;
    return QuranSurahs.filter((surah) => surah.name.includes(query));
  }, [searchSurah]);

  return (
    <div className="container mx-auto px-2">
      <div className="text-center pt-20 font-bold flex gap-5 flex-col">
        <h4 className="text-2xl sm:text-5xl">القرآن الكريم</h4>
        <p className="text-lg sm:text-2xl text-muted-foreground">
          تجربة بسيطة وسهلة لتصفح السور والآيات في القرآن الكريم
        </p>
      </div>

      <div className="p-5 rounded-lg w-full max-w-[1200px] bg-muted mx-auto my-6 border border-primary">
        {/* 🕌 Mode Switch */}
        <div className="relative my-5 w-[70vw] sm:w-[50vw] md:w-[35vw] flex justify-center rounded-full mx-auto p-1 font-bold bg-background">
          <button
            onClick={() => setCurrentMode("surah")}
            className={`w-full cursor-pointer hover:bg-primary hover:text-muted active:bg-primary active:text-muted p-4 text-lg sm:text-2xl transition rounded-l-full ${
              currentMode === "surah" && "bg-primary text-muted"
            }`}
          >
            سوره
          </button>

          <div className="absolute h-[90%] inset-1/2 -translate-1/2 w-0.5 bg-muted" />

          <button
            onClick={() => setCurrentMode("juz")}
            className={`w-full cursor-pointer hover:bg-primary hover:text-muted active:bg-primary active:text-muted p-4 text-lg sm:text-2xl transition rounded-r-full ${
              currentMode === "juz" && "bg-primary text-muted"
            }`}
          >
            جزء
          </button>
        </div>

        {currentMode === "surah" && (
          <>
            <div className="relative">
              <input
                value={searchSurah}
                onChange={(e) => setSearchSurah(e.target.value)}
                placeholder="ابحث عن السورة"
                type="text"
                className="border-primary border p-2 rounded-lg w-full text-center bg-background outline-none font-semibold"
              />
              <IoClose
                onClick={() => setSearchSurah("")}
                size={25}
                className={`absolute top-1/2 -translate-y-1/2 right-4 p-1 rounded-full hover:bg-primary/20 active:bg-primary/30 transition cursor-pointer ${
                  searchSurah ? "block" : "hidden"
                }`}
              />
            </div>

            <div className="h-[600px] overflow-y-auto mt-4 flex flex-col gap-3">
              {filteredSurahs.length > 0 ? (
                filteredSurahs.map((surah, i) => (
                  <Link
                    href={`/quran/reading-quran/surah/${surah.number}`}
                    key={i}
                    className="group flex items-center justify-between sm:p-6 p-3 rounded-2xl bg-card hover:bg-primary/10 active:bg-primary/10 border border-border shadow-sm hover:shadow-md active:shadow-md transition-all cursor-pointer text-right"
                  >
                    <div className="flex gap-2 items-center sm:min-w-[150px] min-w-[100px]">
                      <p className="bg-primary/20 text-primary font-semibold rounded-xl px-3 py-1 sm:px-4 sm:py-2 text-center">
                        آية {surah.ayahs}
                      </p>
                      <span className="bg-muted text-foreground/90 font-medium rounded-xl px-3 py-1 sm:px-4 sm:py-2 text-center">
                        {surah.revelation}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="text-lg sm:text-2xl font-bold text-foreground group-hover:text-primary group-active:text-primary transition-colors">
                        {surah.name}
                      </p>
                      <span className="rounded-full bg-primary text-primary-foreground font-semibold sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center shadow-inner">
                        {surah.number}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-muted-foreground text-xl mt-10">
                  لم يتم العثور على سورة مطابقة 🔍
                </p>
              )}
            </div>
          </>
        )}
        {currentMode === "juz" && (
          <div className="h-[600px] overflow-y-auto mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {QuranJuz.map((juz) => (
              <Link
                href={`/quran/reading-quran/juz/${juz.number}`}
                key={juz.number}
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-card hover:bg-primary/10 active:bg-primary/10 border border-border shadow-sm hover:shadow-md active:shadow-md transition-all duration-300 cursor-pointer text-right"
              >
                {/* 🕋 Juz Header */}
                <div className="flex justify-between items-center mb-3 ">
                  <p className="text-lg sm:text-xl font-bold text-primary group-hover:text-primary/80 group-active:text-primary/80 transition-colors">
                    عدد السور: {juz.surahs.length}
                  </p>
                  <span className="bg-primary text-primary-foreground font-semibold rounded-xl px-4 py-2 text-lg shadow-inner">
                    الجزء {juz.number}
                  </span>
                </div>

                {/* 📖 Surah Names */}
                <div className="flex flex-wrap gap-2 justify-start">
                  {juz.surahs.slice(0,5).map((surah, j) => (
                    <span
                      key={j}
                      className="bg-muted text-foreground/90 font-medium rounded-xl px-3 py-1 text-center hover:bg-primary/20 active:bg-primary/20 transition"
                    >
                      {surah}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingQuran;
