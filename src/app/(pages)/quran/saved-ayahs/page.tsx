"use client";
import NoSavedAyahs from "@/app/Components/Quran/NoSavedAyahs";
import { useState, useEffect } from "react";
import SavedAyahDetails from "@/app/Components/Quran/SavedAyahDetails";
import SavedAyahLoading from "@/app/Components/Quran/SavedAyahLoading";
export interface savedAyahProps {
  ayahNumber: number;
  ayahText: string;
  hizbQuarter: number;
  juz: number;
  page: number;
  revelation: string;
  sajda: boolean;
  surahName: string;
  surahNumber: number;
}

const SavedAyah = () => {
  const [savedAyahs, setSavedAyahs] = useState<savedAyahProps[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  useEffect(() => {
    const fetchSavedAyahs = () => {
      const LocalStorageData = JSON.parse(
        localStorage.getItem("saved-ayahs") || "[]"
      );
      setSavedAyahs(LocalStorageData);
      setIsLoading(false);
    };

    // Simulate a short delay for the skeleton
    setTimeout(fetchSavedAyahs, 500);
  }, []);
  return (
    <div className="container px-2 mx-auto pt-20">
      <div className="text-center font-bold">
        <h1 className="sm:text-5xl text-2xl text-primary font-bold">
          الايات المحفوظه
        </h1>
        <p className="sm:text-2xl text-lg mt-3 text-muted-foreground ">
          يمكنك مشاهدة الآيات التي قمت بحفظها مسبقًا لتسهيل الرجوع إليها
          وقراءتها في أي وقت
        </p>
      </div>
      {isLoading ? (
        <SavedAyahLoading />
      ) : savedAyahs && savedAyahs.length > 0 ? (
        <div className=" flex flex-col gap-5 content-center py-10">
          {savedAyahs.map((ayah, i) => {
            return <SavedAyahDetails ayah={ayah} key={i} />;
          })}
        </div>
      ) : (
        <NoSavedAyahs />
      )}
    </div>
  );
};

export default SavedAyah;
