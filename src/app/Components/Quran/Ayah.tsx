import { ayahOptions } from "@/app/Data/Data";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { SlControlPause, SlControlPlay } from "react-icons/sl";
import { copyToClipBoard } from "@/app/utils/utils";
import { useState, useEffect } from "react";

interface AyahInterface {
  setIsAyahCopied: React.Dispatch<React.SetStateAction<boolean>>;
  ayah: {
    number: number;
    audio: string;
    audioSecondary: string[];
    text: string;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean;
  };
  tafsirAyahs: {
    number?: number;
    audio?: string;
    audioSecondary?: string[];
    text: string;
    numberInSurah?: number;
    juz?: number;
    manzil?: number;
    page?: number;
    ruku?: number;
    hizbQuarter?: number;
    sajda?: boolean;
  };
  surahName: string;
  revelationType: "مكيه" | "مدنيه";
  surahNumber: number;
}

const Ayah = ({
  ayah,
  setIsAyahCopied,
  tafsirAyahs,
  surahName,
  revelationType,
  surahNumber,
}: AyahInterface) => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [tafsirStates, setTafsirStates] = useState<boolean>(false);
  const [savedAyahs, setSavedAyahs] = useState<number[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("saved-ayahs") || "[]");
    setSavedAyahs(
      stored.map((ayah: { ayahNumber: number }) => ayah.ayahNumber)
    );
  }, []);

  const handleTafsirAyah = () => setTafsirStates((prev) => !prev);

  const handleCopyAyah = (text: string) => {
    setIsAyahCopied(true);
    copyToClipBoard(text);
  };

  const handleSaveAyah = (ayah: {
    numberInSurah: number;
    text: string;
    page: number;
    hizbQuarter: number;
    juz: number;
    sajda: boolean;
  }) => {
    const stored = JSON.parse(localStorage.getItem("saved-ayahs") || "[]");
    const isAlreadySaved = stored.some(
      (a: { ayahNumber: number; surahName: string }) =>
        a.ayahNumber === ayah.numberInSurah && a.surahName === surahName
    );

    let updated;
    if (isAlreadySaved) {
      updated = stored.filter(
        (a: { ayahNumber: number; surahName: string }) =>
          !(a.ayahNumber === ayah.numberInSurah && a.surahName === surahName)
      );
    } else {
      const newAyah = {
        ayahNumber: ayah.numberInSurah,
        ayahText: ayah.text,
        juz: ayah.juz,
        page: ayah.page,
        hizbQuarter: ayah.hizbQuarter,
        sajda: ayah.sajda ?? false,
        revelation: revelationType,
        surahName,
        surahNumber,
      };
      updated = [...stored, newAyah];
    }

    localStorage.setItem("saved-ayahs", JSON.stringify(updated));
    setSavedAyahs(updated.map((a: { ayahNumber: number }) => a.ayahNumber));
  };

  const handlePlayAyah = (ayahNumber: number, audioSrc: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(audioSrc);
    audio.play();
    setCurrentAudio(audio);
    setPlayingAyah(ayahNumber);

    audio.onended = () => {
      setPlayingAyah(null);
      setCurrentAudio(null);
    };
  };

  const handlePauseAyah = () => {
    if (currentAudio) {
      currentAudio.pause();
      setPlayingAyah(null);
    }
  };

  const handleOptionsSelection = (
    btn: { label: string },
    ayah: {
      number: number;
      audio: string;
      numberInSurah: number;
      text: string;
      page: number;
      hizbQuarter: number;
      juz: number;
      sajda: boolean;
    }
  ) => {
    if (btn.label === "نسخ") handleCopyAyah(ayah.text);
    else if (btn.label === "تفسير") handleTafsirAyah();
    else if (btn.label === "استماع") {
      if (playingAyah === ayah.number) handlePauseAyah();
      else handlePlayAyah(ayah.number, ayah.audio);
    } else if (btn.label === "حفظ") handleSaveAyah(ayah);
  };

  const tafsir = tafsirAyahs?.text;

  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      className="group relative rounded-3xl border border-primary/20 bg-gradient-to-br from-background/80 to-muted/50 p-3 sm:p-6 shadow-md hover:shadow-xl transition-all duration-500 backdrop-blur-sm"
    >
      {/* Ayah Text */}
      <div className="flex items-center justify-center sm:justify-end gap-3 text-end leading-relaxed flex-wrap sm:flex-nowrap flex-col-reverse">
        <p className="text-base sm:text-2xl md:text-3xl font-cairo text-foreground/90 group-hover:text-primary transition-colors duration-300">
          {ayah.text}
        </p>
        <span className="rounded-full bg-primary text-xs sm:text-xl text-primary-foreground font-semibold sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
          {ayah.numberInSurah}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center sm:justify-end gap-2 flex-wrap mt-3 sm:mt-6">
        {ayahOptions.map((btn, idx) => {
          const isPlaying =
            btn.label === "استماع" && playingAyah === ayah.number;
          const isSaved = savedAyahs.includes(ayah.numberInSurah);

          return (
            <div key={idx} className="relative group/btn">
              <button
                onClick={() => handleOptionsSelection(btn, ayah)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 border border-primary/30 bg-gradient-to-br from-background/60 to-muted/40 rounded-xl sm:rounded-2xl px-2 py-1 sm:px-5 sm:py-2 text-foreground/90 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 cursor-pointer w-[70px] sm:w-auto"
              >
                <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300 text-primary">
                  {btn.label === "استماع" ? (
                    isPlaying ? (
                      <SlControlPause />
                    ) : (
                      <SlControlPlay />
                    )
                  ) : btn.label === "حفظ" ? (
                    isSaved ? (
                      <IoBookmark />
                    ) : (
                      <IoBookmarkOutline />
                    )
                  ) : (
                    btn.icon
                  )}
                </span>
                <span className="hidden sm:inline group-hover:text-primary transition-colors duration-300 text-sm sm:text-lg">
                  {btn.label}
                </span>
              </button>

              {/* Tooltip */}
              <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 block sm:hidden opacity-0 translate-y-1 group-hover/btn:opacity-100 group-hover/btn:translate-y-0 transition-all duration-300">
                <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-md shadow-md whitespace-nowrap">
                  {btn.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tafsir Section */}
      <div
        className={`w-full mt-4 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-muted/30 to-background/70 shadow-inner p-3 sm:p-6 transform origin-top transition-all duration-500 ease-in-out ${
          tafsirStates
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 h-0 p-0"
        }`}
      >
        <h4 className="text-end text-base sm:text-xl font-semibold text-primary mb-2">
          التفسير
        </h4>
        <p className="text-end text-foreground/90 text-sm sm:text-2xl leading-loose">
          {tafsir}
        </p>
      </div>
    </div>
  );
};

export default Ayah;
