import { GiOpenBook } from "react-icons/gi";
import { FaBookOpen, FaRegEye, FaStar } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import Link from "next/link";
import { savedAyahProps } from "@/app/(pages)/quran/saved-ayahs/page";
import { calculateHizb } from "@/app/utils/utils";

interface savedAyahComponentProps {
  ayah: savedAyahProps;
}
const SavedAyahDetails = ({ ayah }: savedAyahComponentProps) => {
  return (
    <Link
      href={`/quran/reading-quran/surah/${ayah.surahNumber}#ayah-${ayah.ayahNumber}`}
      className="block bg-muted p-5 sm:p-8 rounded-3xl border-2 border-background shadow-lg hover:shadow-xl hover:scale-[1.01] hover:border-primary active:shadow-xl active:scale-[1.01] active:border-primary transition-all duration-300 mx-auto w-full max-w-[1100px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap mb-3">
        <div className="flex items-center gap-2 text-primary font-bold text-xl sm:text-2xl">
          <GiOpenBook className="text-primary" />
          <span>{ayah.surahName}</span>
        </div>
        <span className="bg-primary text-background text-sm sm:text-base font-semibold px-3 py-1 rounded-full shadow-sm">
          آية {ayah.ayahNumber}
        </span>
      </div>

      {/* Ayah Text */}
      <p className="text-foreground leading-relaxed text-lg sm:text-2xl text-center mb-4 font-medium">
        {ayah.ayahText}
      </p>

      {/* Meta Info */}
      <div className="flex justify-center sm:justify-between flex-wrap gap-3 text-sm sm:text-lg text-muted-foreground border-t border-primary/20 pt-3">
        <div className="flex items-center gap-1">
          <FaBookOpen className="text-primary" />
          <span>الجزء {ayah.juz}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaRegEye className="text-primary" />
          <span>الحزب : {calculateHizb(ayah.hizbQuarter)}</span>
        </div>
        <div className="flex items-center gap-1">
          <MdOutlineExplore className="text-primary" />
          <span>الصفحة {ayah.page}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaStar className="text-primary" />
          <span>{ayah.revelation}</span>
        </div>
      </div>

      {/* Sajda Indicator */}
      {ayah.sajda && (
        <div className="text-center mt-4">
          <span className="inline-block bg-primary text-white text-sm sm:text-base px-4 py-1 rounded-full shadow-md">
            سجدة
          </span>
        </div>
      )}
    </Link>
  );
};

export default SavedAyahDetails;
