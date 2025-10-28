import Link from "next/link";
import React from "react";
import { QuranSurahs } from "@/app/Data/Data";
interface SearchQueryAyah {
  result: { verse_key: string; words: { text: string }[]; text: string };
}
const SearchQuranAyah = ({ result }: SearchQueryAyah) => {
  const [surahNumber, ayahNumber] = result.verse_key.split(":");
  const surahName = QuranSurahs.find(
    (surah) => surah.number === +surahNumber
  )?.name;
  return (
    <Link
      href={`/quran/reading-quran/surah/${surahNumber}#ayah-${ayahNumber}`}
      className="block bg-muted p-5 sm:p-8 rounded-3xl border-2 border-background shadow-lg hover:shadow-xl hover:scale-[1.01] hover:border-primary/70 active:border-primary/70 active:shadow-xl active:scale-[1.01] transition-all duration-300 mx-auto w-full max-w-[1100px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap mb-3 border-b border-primary/20 pb-2">
        <div className="flex items-center gap-2 text-primary font-bold text-xl sm:text-2xl">
          <span>سورة {surahName}</span>
        </div>
        <span className="bg-primary text-background text-sm sm:text-base font-semibold px-3 py-1 rounded-full shadow-sm">
          آية {ayahNumber}
        </span>
      </div>

      {/* Ayah Text */}
      <div className="text-foreground leading-relaxed text-lg sm:text-2xl text-center mb-2 font-medium flex flex-wrap justify-center gap-2">
        {result.text}
      </div>
    </Link>
  );
};

export default SearchQuranAyah;
