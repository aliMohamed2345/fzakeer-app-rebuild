"use client";
import { useParams, usePathname } from "next/navigation";
import Ayah from "@/app/Components/Quran/Ayah";
import { useState, useEffect } from "react";
import Alert from "@/app/Components/Home/Alert";
import { AyahProps } from "@/app/Data/Data";
import Link from "next/link";
import SurahLoading from "@/app/Components/Quran/SurahLoading";
interface SurahDataProps extends AyahProps {
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

const SurahId = () => {
  const pathname = usePathname();
  const { surahId } = useParams();
  const [isAyahCopied, setIsAyahCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [surahData, setSurahData] = useState<SurahDataProps>({
    name: "",
    englishName: "",
    englishNameTranslation: "",
    revelationType: "",
    numberOfAyahs: 0,
    ayahs: [
      {
        number: 0,
        audio: "",
        audioSecondary: [],
        text: "",
        numberInSurah: 0,
        juz: 0,
        manzil: 0,
        page: 0,
        ruku: 0,
        hizbQuarter: 0,
        sajda: false,
      },
    ],
  });

  const [tafsirAyahs, setTafsirAyahs] = useState<AyahProps>({
    ayahs: [
      {
        number: 0,
        audio: "",
        audioSecondary: [],
        text: "",
        numberInSurah: 0,
        juz: 0,
        manzil: 0,
        page: 0,
        ruku: 0,
        hizbQuarter: 0,
        sajda: false,
      },
    ],
  });
  //for scrolling to the saved ayah directly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 300);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const [surahResponse, tafsirResponse] = await Promise.all([
          fetch(`/api/quran?path=surah/${surahId}/ar.alafasy`),
          fetch(`/api/quran?path=surah/${surahId}/ar.muyassar`),
        ]);
        const surahData = await surahResponse.json();
        const tafsirData = await tafsirResponse.json();
        setSurahData(surahData.data);
        setTafsirAyahs(tafsirData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurah();
  }, [surahId]);

  return (
    <>
      {loading ? (
        <SurahLoading />
      ) : (
        <div className="pt-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl text-primary">
              {surahData?.name}
            </h1>
            <h6 className="sm:text-2xl text-lg text-muted-foreground mt-4">
              {surahData?.englishName} - {surahData?.englishNameTranslation} -{" "}
              {surahData?.revelationType === "Meccan" ? "مكيه" : "مدنيه"}
            </h6>
          </div>

          <div className="p-8 rounded-3xl w-full max-w-[1100px] bg-gradient-to-br from-background to-muted/70 mx-auto my-10 border border-primary/30 shadow-lg backdrop-blur-md">
            <h4 className="text-center text-primary sm:text-4xl text-2xl font-semibold tracking-wide mb-10">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h4>

            <div className="h-[600px] overflow-y-auto flex flex-col gap-2 sm:gap-6 px-4 sm:px-8 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent">
              {surahData?.ayahs?.map((ayah, i: number) => (
                <Ayah
                  surahNumber={+surahId!}
                  key={i}
                  ayah={ayah}
                  setIsAyahCopied={setIsAyahCopied}
                  tafsirAyahs={tafsirAyahs?.ayahs?.[i]}
                  surahName={surahData.name}
                  revelationType={
                    surahData.revelationType === "Meccan" ? "مكيه" : "مدنيه"
                  }
                />
              ))}
            </div>

            <div className="flex items-center my-5 justify-between">
              <Link
                href={`/quran/reading-quran/surah/${+surahId! - 1}`}
                className={`bg-muted border text-center transition border-primary rounded-lg p-3 text-sm sm:text-xl font-bold w-24 sm:w-32
                  ${
                    +surahId! === 1
                      ? "opacity-50 cursor-not-allowed pointer-events-none hover:bg-muted hover:text-primary"
                      : "hover:bg-primary hover:text-muted active:bg-primary active:text-muted text-primary"
                  }`}
              >
                السابق
              </Link>

              <Link
                href={`/quran/reading-quran/surah/${+surahId! + 1}`}
                className={`bg-muted border text-center transition border-primary rounded-lg p-3 text-sm sm:text-xl font-bold w-24 sm:w-32
                  ${
                    +surahId! === 114
                      ? "opacity-50 cursor-not-allowed pointer-events-none hover:bg-muted hover:text-primary"
                      : "hover:bg-primary hover:text-muted active:bg-primary active:text-muted text-primary"
                  }`}
              >
                التالي
              </Link>
            </div>
          </div>

          {isAyahCopied && (
            <Alert
              title="تم النسخ"
              description="تم نسخ الآية إلى الحافظة"
              onClose={() => setIsAyahCopied(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SurahId;
