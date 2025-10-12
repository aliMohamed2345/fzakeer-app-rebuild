"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import DropDownMenu from "@/app/Components/Home/DropDownMenu";
import HadithLoading from "@/app/Components/Hadith/HadithLoading";
import { HadithBooks, HadithProps } from "@/app/Data/Data";

const Hadith = () => {
  const [currentHadith, setCurrentHadith] = useState<string>("صحيح البخاري");
  const [hadiths, setHadiths] = useState<HadithProps[]>([]);
  const [searchedHadith, setSearchedHadith] = useState<HadithProps | null>(
    null
  );
  const [totalHadithNumber, setTotalHadithNumber] = useState<number>(0);
  const [hadithNumber, setHadithNumber] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const hadithPerPage = 20;

  // ✅ Precompute values using useMemo
  const currentBookId = useMemo(
    () => HadithBooks.find((b) => b.name === currentHadith)?.id,
    [currentHadith]
  );
  const totalPages = useMemo(
    () => Math.ceil(totalHadithNumber / hadithPerPage),
    [totalHadithNumber]
  );

  const hadithRange = useMemo(() => {
    const start = (page - 1) * hadithPerPage + 1;
    const end = page * hadithPerPage;
    return `${start}-${end}`;
  }, [page]);

  // ✅ Memoized URLs
  const hadithApiUrl = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_HADITH_API}/${currentBookId}?range=${hadithRange}`,
    [currentBookId, hadithRange]
  );

  const searchHadithUrl = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_HADITH_API}/${currentBookId}/${hadithNumber}`,
    [currentBookId, hadithNumber]
  );

  // ✅ Fetch hadith list
  const fetchHadiths = useCallback(async () => {
    if (!currentBookId) return;
    setLoading(true);
    try {
      const res = await fetch(hadithApiUrl);
      const data = await res.json();
      setHadiths(data.data.hadiths);
      setTotalHadithNumber(data.data.available);
    } catch (err) {
      console.error("Error fetching hadiths:", err);
    } finally {
      setLoading(false);
    }
  }, [hadithApiUrl, currentBookId]);

  // ✅ Fetch searched hadith
  const handleSearchHadith = useCallback(async () => {
    if (!currentBookId || !hadithNumber) return;
    setLoading(true);
    try {
      const res = await fetch(searchHadithUrl);
      const data = await res.json();
      setSearchedHadith(data.data.contents);
    } catch (err) {
      console.error("Error fetching searched hadith:", err);
    } finally {
      setLoading(false);
    }
  }, [searchHadithUrl, currentBookId, hadithNumber]);

  // ✅ Effects
  useEffect(() => {
    fetchHadiths();
  }, [fetchHadiths]);

  // ✅ Handlers
  const handleDropDownSelection = (value: string) => {
    setCurrentHadith(value);
    setPage(1);
    setSearchedHadith(null);
  };
  const handleRemoveSearchedHadith = () => {
    setSearchedHadith(null);
    setHadithNumber(null);
  };
  const handleSearchButtonKeys = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") handleSearchHadith();
    else if (e.key === "Escape") handleRemoveSearchedHadith();
  };
  // ✅ Pagination Controls
  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <div className="pt-20 text-center font-bold">
        <h1 className="text-3xl sm:text-6xl">الحديث الشريف</h1>
        <h4 className="text-muted-foreground text-xl sm:text-2xl pt-2">
          استكشف آلاف الأحاديث الصحيحة من 9 كتب رئيسية بما في ذلك صحيح البخاري
          وصحيح مسلم
        </h4>
      </div>

      {/* Selector Section */}
      <div className="bg-muted border border-primary p-2 rounded-lg w-full max-w-[1200px] mx-auto my-6 text-right">
        <p className="text-primary text-3xl font-bold mb-6">اختر كتاب الحديث</p>

        <div className="flex gap-2 items-center justify-end flex-col-reverse sm:flex-row">
          <div className="text-primary font-bold text-lg sm:text-xl bg-primary/20 p-3 rounded-md">
            <p>
              الصفحة {page} من {totalPages}
            </p>
          </div>

          <DropDownMenu
            options={HadithBooks.map((book) => book.name)}
            initialValue="صحيح البخاري"
            onSelect={handleDropDownSelection}
          />
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 py-5 h-20">
          <button
            onClick={handleSearchHadith}
            disabled={loading}
            className="flex cursor-pointer gap-2 p-2 rounded-lg font-bold items-center transition text-xl bg-muted text-primary border border-primary hover:bg-primary hover:text-muted active:bg-primary active:text-muted"
          >
            ابحث <IoIosSearch size={25} />
          </button>

          <div className="bg-muted border-primary border p-2 rounded-lg w-full relative">
            <input
              value={hadithNumber ?? ""}
              placeholder="ابحث برقم الحديث..."
              onKeyDown={(e) => handleSearchButtonKeys(e)}
              onChange={(e) => setHadithNumber(+e.target.value)}
              min={1}
              max={totalHadithNumber}
              type="number"
              className="w-full h-full outline-none text-xl text-center"
            />
            <button
              onClick={handleRemoveSearchedHadith}
              className={`absolute top-1/2 -translate-1/2 right-4 p-1 rounded-full hover:bg-primary/20 active:bg-primary/30 transition cursor-pointer ${
                hadithNumber ?? "hidden"
              }`}
            >
              <IoClose />
            </button>
          </div>
        </div>
      </div>

      {/* Hadith Display */}
      <div className="p-4 rounded-lg w-full max-w-[1200px] bg-muted mx-auto my-6 border border-primary">
        <div className="h-[600px] overflow-y-auto mt-4 flex flex-col gap-5">
          {loading ? (
            <HadithLoading />
          ) : searchedHadith ? (
            <div className="bg-background shadow-lg rounded-lg p-5 text-right">
              <span className="rounded-full bg-muted border border-primary p-2 text-2xl w-10 h-10 flex items-center justify-center text-primary font-bold">
                {searchedHadith.number}
              </span>
              <p className="text-base sm:text-2xl font-bold mt-3">
                {searchedHadith.arab}
              </p>
            </div>
          ) : (
            hadiths.map((hadith) => (
              <div
                key={hadith.number}
                className="bg-background group flex flex-col items-center shadow-lg gap-5 p-5 rounded-lg"
              >
                <span className="rounded-full bg-muted border border-primary p-2 text-2xl w-10 h-10 flex items-center justify-center text-primary font-bold">
                  {hadith.number}
                </span>
                <p className="text-base sm:text-2xl font-bold text-right w-full break-words">
                  {hadith.arab}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center my-5 justify-between">
          <button
            disabled={page === totalPages}
            onClick={nextPage}
            className="bg-muted border border-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted disabled:hover:text-primary hover:bg-primary hover:text-muted active:bg-primary active:text-muted text-primary rounded-lg p-3 text-sm sm:text-xl font-bold w-24 sm:w-32 cursor-pointer"
          >
            &lt; التالي
          </button>

          <div className="text-primary font-bold text-sm sm:text-xl bg-primary/20 p-3 rounded-md  hidden sm:block">
            <p>
              الصفحة {page} من {totalPages}
            </p>
          </div>

          <button
            disabled={page === 1}
            onClick={prevPage}
            className="bg-muted  border border-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted disabled:hover:text-primary hover:bg-primary hover:text-muted active:bg-primary active:text-muted text-primary rounded-lg p-3 text-sm sm:text-xl font-bold w-24 sm:w-32 cursor-pointer"
          >
            السابق &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default Hadith;
