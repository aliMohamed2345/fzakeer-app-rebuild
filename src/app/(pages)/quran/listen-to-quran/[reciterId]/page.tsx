"use client";
import { reciters } from "@/app/Data/Data";
import { useParams, useSearchParams } from "next/navigation";
import { QuranSurahs } from "@/app/Data/Data";
import { useState } from "react";
import ListenToQuranOptions from "@/app/Components/Quran/ListenToQuranOptions";
import AudioPlayer from "@/app/Components/Quran/AudioPlayer";
import { surahIdFormat } from "@/app/utils/utils";
const ReciterId = () => {
  const { reciterId } = useParams();
  const rewayaId = useSearchParams().get("rewayaId") || "";

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentAudio, setCurrentAudio] = useState<string>("");
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const currentReciter = reciters.find((reciter) => reciter.id === +reciterId!);
  console.log(isPlayerOpen);
  const currentMushaf = rewayaId
    ? currentReciter?.moshaf.find((mo) => mo.id === +rewayaId)
    : currentReciter?.moshaf[0];

  return (
    <>
      <div className="container pt-20 text-center mx-auto px-2">
        <h1 className="sm:text-5xl text-2xl text-primary">
          {currentReciter?.name}
        </h1>
        <p className="text-muted-foreground text-lg sm:text-3xl text-center mt-4">
          سوره {currentMushaf?.surah_total} بروايه {currentMushaf?.name}
        </p>

        <div className="p-4 rounded-lg w-full max-w-[1200px] bg-muted mx-auto my-6 border border-primary">
          <div className="h-[600px] overflow-y-auto mt-4 flex flex-col gap-5">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن السورة..."
              className="w-full outline-none text-xl text-center bg-background border-primary border p-2 rounded-lg relative"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {currentMushaf?.surah_list
                .split(",")
                .filter((surahId) => {
                  const surahName = QuranSurahs.find(
                    (surah) => surah.number === +surahId
                  )?.name;
                  return !searchQuery || surahName?.includes(searchQuery);
                })
                .map((surahId, index) => {
                  const surahName = QuranSurahs.find(
                    (surah) => surah.number === +surahId
                  )?.name;

                  const audioUrl = `${currentMushaf?.server}${surahIdFormat(
                    +surahId
                  )}.mp3`;

                  return (
                    <div
                      key={surahId}
                      onClick={() => {
                        setCurrentAudio(audioUrl);
                        setIsPlayerOpen(true);
                      }}
                      className="bg-background border border-primary p-3 rounded-lg sm:text-xl cursor-pointer transition flex items-center justify-between "
                    >
                      <ListenToQuranOptions
                        currentAudio={audioUrl}
                        reciterName={currentReciter?.name || ""}
                        surahName={surahName || ""}
                        isOpen={openMenuIndex === index}
                        onToggle={() =>
                          setOpenMenuIndex(
                            openMenuIndex === index ? null : index
                          )
                        }
                      />
                      {surahName}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {isPlayerOpen && (
        <AudioPlayer
          audioLink={currentAudio}
          setIsPlayerOpen={setIsPlayerOpen}
        />
      )}
      {/* <AudioPlayer audioLink={currentAudio} setIsPlayerOpen={setIsPlayerOpen}/> */}
    </>
  );
};

export default ReciterId;
