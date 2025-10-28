"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Ayah from "@/app/Components/Quran/Ayah";
import SurahLoading from "@/app/Components/Quran/SurahLoading";
import Alert from "@/app/Components/Home/Alert";
import { AyahProps } from "@/app/Data/Data";
import { calculateHizb } from "@/app/utils/utils";

interface GroupedSurah extends AyahProps {
  surahNumber: number;
  surahName: string;
  revelationType: string;
  ayahs: Array<{
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
  }>;
}

interface JuzDataProps {
  juz: number;
  ayahs: Array<{
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
    surah: { number: number; name: string; revelationType: string };
  }>;
}

const JuzId = () => {
  const { JuzId } = useParams();
  const [loading, setLoading] = useState(true);
  const [groupedSurahs, setGroupedSurahs] = useState<GroupedSurah[]>([]);
  const [tafsirData, setTafsirData] = useState<AyahProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAyahCopied, setIsAyahCopied] = useState<boolean>(false);
  const fetchJuz = async () => {
    setLoading(true);
    setError(null);

    try {
      const recitationUrl = `/api/quran?path=juz/${JuzId}/ar.alafasy`;
      const tafsirUrl = `/api/quran?path=juz/${JuzId}/ar.muyassar`;

      const [recRes, tafRes] = await Promise.all([
        fetch(recitationUrl),
        fetch(tafsirUrl),
      ]);

      if (!recRes.ok || !tafRes.ok) throw new Error("API fetch failed");

      const recJson = await recRes.json();
      const tafJson = await tafRes.json();

      const juzData: JuzDataProps = recJson.data;
      const tafsir = tafJson.data;

      // ✅ Group ayahs by surah
      const surahGroups: Record<number, GroupedSurah> = {};
      juzData.ayahs.forEach((ayah) => {
        const surahNum = ayah.surah.number;
        if (!surahGroups[surahNum]) {
          surahGroups[surahNum] = {
            surahNumber: surahNum,
            surahName: ayah.surah.name,
            revelationType: ayah.surah.revelationType,
            ayahs: [],
          };
        }
        surahGroups[surahNum].ayahs.push({
          number: ayah.number,
          audio: ayah.audio,
          audioSecondary: ayah.audioSecondary,
          text: ayah.text,
          numberInSurah: ayah.numberInSurah,
          juz: ayah.juz,
          manzil: ayah.manzil,
          page: ayah.page,
          ruku: ayah.ruku,
          hizbQuarter: ayah.hizbQuarter,
          sajda: ayah.sajda,
        });
      });

      setGroupedSurahs(Object.values(surahGroups));
      setTafsirData(tafsir);
    } catch (err) {
      console.error(err);
      setError("فشل تحميل بيانات الجزء. حاول مرة أخرى لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (JuzId) fetchJuz();
  }, [JuzId]);

  return (
    <>
      {loading ? (
        <SurahLoading />
      ) : error ? (
        <div className="pt-24 text-center">
          <p className="text-destructive text-lg font-semibold mb-4">{error}</p>
          <button
            onClick={fetchJuz}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <div className="pt-24 container px-2 mx-auto">
          <h1 className="text-center text-4xl sm:text-6xl text-primary">
            الجزء {JuzId}
          </h1>
          <div className="flex gap-2 items-center flex-wrap justify-center mt-8">
            {groupedSurahs.map((surah, i) => (
              <Link
                className="gap-2 p-2 rounded-lg font-bold transition text-xl bg-muted text-primary border border-primary hover:bg-primary hover:text-muted active:bg-primary active:text-muted"
                key={i}
                href={`/quran/reading-quran/surah/${surah.surahNumber}`}
              >
                {surah.surahName.slice(7)}
              </Link>
            ))}
          </div>
          <div className="p-8 rounded-3xl w-full max-w-[1100px] bg-gradient-to-br from-background to-muted/70 mx-auto my-10 border border-primary/30 shadow-lg backdrop-blur-md">
            <div className="h-[600px] overflow-y-auto flex flex-col gap-2 sm:gap-6 px-4 sm:px-8 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent">
              {groupedSurahs.map((surah) => (
                <div key={surah.surahNumber} className="mb-10 ">
                  <h2 className="text-center text-primary text-2xl sm:text-4xl mb-6">
                    {surah.surahName} ( {surah.surahNumber} )
                    <div className="flex gap-2 items-center justify-between text-sm sm:text-3xl mt-6 text-muted-foreground">
                      <p>الجزء: {surah.ayahs[0].juz}</p>
                      <p>الحزب: {calculateHizb(surah.ayahs[0].hizbQuarter)}</p>
                    </div>
                  </h2>

                  <div className="flex flex-col gap-4 sm:gap-6">
                    {surah.ayahs.map((ayah, i) => (
                      <Ayah
                        surahNumber={+JuzId!}
                        key={`${ayah.number}-${i}`}
                        ayah={ayah}
                        setIsAyahCopied={setIsAyahCopied}
                        tafsirAyahs={tafsirData?.ayahs?.[i] ?? { text: "" }}
                        surahName={surah.surahName}
                        revelationType={
                          surah.revelationType === "Meccan" ? "مكيه" : "مدنيه"
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center my-5 justify-between">
              <Link
                href={`/quran/reading-quran/surah/${+JuzId! - 1}`}
                className={`bg-muted border text-center transition border-primary rounded-lg p-3 text-sm sm:text-xl font-bold w-24 sm:w-32
                  ${
                    +JuzId! === 1
                      ? "opacity-50 cursor-not-allowed pointer-events-none hover:bg-muted hover:text-primary active:bg-muted active:text-primary"
                      : "hover:bg-primary hover:text-muted active:bg-primary active:text-muted text-primary"
                  }`}
              >
                السابق
              </Link>

              <Link
                href={`/quran/reading-quran/surah/${+JuzId! + 1}`}
                className={`bg-muted border text-center transition border-primary rounded-lg p-3 text-sm sm:text-xl font-bold w-24 sm:w-32
                  ${
                    +JuzId! === 114
                      ? "opacity-50 cursor-not-allowed pointer-events-none hover:bg-muted hover:text-primary active:bg-muted active:text-primary"
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

export default JuzId;
