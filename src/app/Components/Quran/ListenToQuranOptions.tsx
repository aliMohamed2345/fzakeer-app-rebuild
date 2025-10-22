"use client";
import { useRef } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { handleDownloadSurah, copyToClipBoard } from "@/app/utils/utils";
import { FaPlay } from "react-icons/fa";
import { MdOutlineContentCopy, MdOutlineFileDownload } from "react-icons/md";

interface ListenToQuranOptionsProps {
  currentAudio: string;
  reciterName: string;
  surahName: string;
  isOpen: boolean;
  onToggle: () => void;
}

const ListenToQuranOptions = ({
  currentAudio,
  reciterName,
  surahName,
  isOpen,
  onToggle,
}: ListenToQuranOptionsProps) => {
  const surahFileName = `سورة ${surahName} للقارئ ${reciterName}`;
  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative" ref={menuRef}>
      {/* Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="transition-all bg-primary/10 hover:bg-primary/20 active:bg-primary/30 rounded-full p-2 border border-primary/20 cursor-pointer"
        aria-label="خيارات السورة"
      >
        <SlOptionsVertical className="text-primary text-lg" />
      </button>

      {/* Options Menu */}
      <div
        onClick={(e) => e.stopPropagation()} // 👈 Prevent closing when clicking inside
        className={`absolute left-0 mt-2 bg-background border border-primary/20 shadow-xl rounded-2xl p-3 w-[230px] z-50 transform transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <h3 className="text-primary text-lg font-bold text-center mb-1">
          {surahName}
        </h3>
        <p className="text-muted-foreground text-sm text-center mb-3">
          القارئ: {reciterName}
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              handleDownloadSurah(currentAudio, surahFileName);
              onToggle();
            }}
            className="flex items-center justify-center gap-2 sm:justify-between bg-muted hover:bg-primary hover:text-background transition rounded-xl p-2 font-semibold text-base shadow-sm cursor-pointer"
          >
            تحميل <MdOutlineFileDownload className="text-lg" />
          </button>

          <button
            onClick={() => {
              copyToClipBoard(currentAudio);
              onToggle();
            }}
            className="flex items-center justify-center gap-2 sm:justify-between bg-muted hover:bg-primary hover:text-background transition rounded-xl p-2 font-semibold text-base shadow-sm cursor-pointer"
          >
            نسخ الرابط <MdOutlineContentCopy className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListenToQuranOptions;
