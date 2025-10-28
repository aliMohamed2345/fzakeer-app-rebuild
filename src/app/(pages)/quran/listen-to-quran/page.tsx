"use client";
import FilterReciter from "@/app/Components/Quran/FilterReciter";
import { reciters } from "@/app/Data/Data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const ListenToQuran = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredReciters, setFilteredReciters] = useState(reciters);

  const searchParams = useSearchParams();
  const rewayahId = searchParams.get("rewayaId") || "";
  const letter = searchParams.get("letter") || "";

  useEffect(() => {
    const filtered = reciters.filter((reciter) => {
      const matchesSearch = reciter.name.includes(searchQuery);
      const matchesLetter = letter ? reciter.letter === letter : true;
      const matchesRewaya = rewayahId
        ? reciter.moshaf.some((rewaya) => rewaya.id === +rewayahId)
        : true;

      // Apply all filters together — if any filter is set, it must match
      return matchesSearch && matchesLetter && matchesRewaya;
    });

    setFilteredReciters(filtered);
  }, [searchQuery, letter, rewayahId]);

  return (
    <div className="pt-20 container mx-auto px-2">
      <div className="text-center font-bold">
        <h1 className="sm:text-5xl text-2xl text-primary">
          الاستماع الي القرآن
        </h1>
        <p className="sm:text-2xl text-lg mt-5 text-muted-foreground">
          تشكيله منوعه وكبيره من كبار القراء للقران الكريم
        </p>
      </div>

      <div className="p-4 rounded-lg w-full max-w-[1200px] bg-muted mx-auto my-6 border border-primary">
        <div className="h-[600px] overflow-y-auto mt-4 flex flex-col gap-5">
          <div className="flex items-center gap-4 h-10">
            <FilterReciter />
            <input
              value={searchQuery}
              placeholder="ابحث عن القارئ..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none text-xl text-center bg-background border-primary border p-2 rounded-lg relative"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {filteredReciters.map((reciter) => (
              <Link
                className="text-center bg-background p-2 rounded-lg transition hover:bg-primary hover:text-background active:bg-primary active:text-background text-xl font-bold"
                key={reciter.id}
                href={`/quran/listen-to-quran/${reciter.id}${
                  rewayahId ? `?rewayahId=${rewayahId}` : ""
                }`}
              >
                {reciter.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListenToQuran;
