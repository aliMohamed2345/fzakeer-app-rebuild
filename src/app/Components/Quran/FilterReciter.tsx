"use client";
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import DropDownMenu from "../Home/DropDownMenu";
import { quranRiwayat } from "@/app/Data/Data";
import { useRouter } from "next/navigation";

const FilterReciter = () => {
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [filters, setFilters] = useState({ letter: "", rewayaId: 0 });
  const arabicRegex = /^[\u0600-\u06FF]$/;
  const router = useRouter();

  const handleDropDownSelection = (value: string) => {
    const id = quranRiwayat.find((rewaya) => rewaya.name === value)?.id ?? 0;
    setFilters((prev) => ({ ...prev, rewayaId: id }));
  };

  const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // ✅ Allow only one Arabic character (Unicode range)

    if (input === "" || arabicRegex.test(input)) {
      setFilters((prev) => ({ ...prev, letter: input }));
    }
  };
  const handleCancleSelection = () => {
    setIsFilterOpened(false);
    setFilters({ letter: "", rewayaId: 0 });
    router.push(`/quran/listen-to-quran`);
  };

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams();

    // Add only active filters
    if (filters.letter) queryParams.set("letter", filters.letter);
    if (filters.rewayaId)
      queryParams.set("rewayaId", filters.rewayaId.toString());

    router.push(`/quran/listen-to-quran?${queryParams.toString()}`);
    setIsFilterOpened(false);
  };

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsFilterOpened(true)}
        className="p-2 rounded-lg border border-primary transition-all duration-300 h-10 w-10 flex items-center justify-center cursor-pointer 
        text-primary hover:bg-primary hover:text-background hover:shadow-md active:bg-primary active:text-background active:shadow-md active:scale-95 shadow-sm "
        aria-label="Open Filter"
      >
        <CiFilter size={26} />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsFilterOpened(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 
        ${isFilterOpened ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      ></div>

      {/* Modal */}
      <div
        className={`fixed z-50 inset-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[90vw] sm:w-[70vw] md:w-[50vw] max-h-[85vh] overflow-y-auto rounded-2xl 
        bg-gradient-to-br from-background to-muted/70 border border-primary/30 
        shadow-2xl p-6 transition-all duration-300 ease-out h-fit
        min-h-[400px]
        ${
          isFilterOpened
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsFilterOpened(false)}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-muted/60 hover:text-foreground active:bg-muted/60 active:text-foreground text-muted-foreground  transition-all cursor-pointer"
          aria-label="Close Filter"
        >
          <IoClose size={22} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6 border-b border-primary/20 pb-3">
          <CiFilter className="text-primary text-2xl" />
          <h2 className="font-bold text-2xl text-primary">البحث المتقدم</h2>
        </div>

        {/* Filter Content Area */}
        <div className="space-y-6 text-end flex flex-col ">
          {/* Example Filter Option */}
          <div className="flex items-center gap-2 justify-between">
            <DropDownMenu
              onSelect={(value) => handleDropDownSelection(value)}
              initialValue="روايه"
              options={quranRiwayat.map((riwaya) => riwaya.name)}
            />
            <p className="block text-sm sm:text-lg font-semibold text-muted-foreground mb-2">
              نوع الرواية
            </p>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <input
              placeholder="ت"
              onChange={(e) => handleLetterChange(e)}
              type="text"
              maxLength={1}
              className="bg-muted border border-primary outline-none rounded-lg p-3 w-10 text-center text-lg"
            />
            <p className="block text-sm sm:text-lg font-semibold text-muted-foreground mb-2">
              ترتيب القارئ من الحرف
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleCancleSelection}
              className="px-6 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 transition-all cursor-pointer"
            >
              إلغاء
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-6 py-2 rounded-lg bg-primary text-background hover:bg-primary/90 active:bg-primary/90 transition-all cursor-pointer"
            >
              تطبيق الفلاتر
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterReciter;
