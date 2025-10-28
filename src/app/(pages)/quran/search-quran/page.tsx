"use client";
import SearchQuranAyah from "@/app/Components/Quran/SearchQuranAyah";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import SearchQuranLoading from "@/app/Components/Quran/SearchQuranLoading";
import NotFoundQuranAyah from "@/app/Components/Quran/NotFoundQuranAyah";

interface resultsProps {
  total_results: number;
  total_pages: number;
  results: {
    text: string;
    verse_key: string;
    words: { char_type: string; text: string }[];
  }[];
}

const SearchQuran = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [results, setResults] = useState<resultsProps | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 🔹 Reset when query changes
  useEffect(() => {
    setResults(null);
    setPage(1);
  }, [debouncedSearchQuery]);

  // 🔹 Fetch Data
  useEffect(() => {
    const fetchQueryData = async () => {
      if (!debouncedSearchQuery) return;
      setIsLoading(true);

      const api = `${process.env.NEXT_PUBLIC_QURAN_SEARCH}?q=${debouncedSearchQuery}&page=${page}`;
      try {
        const res = await fetch(api);
        const data = await res.json();
        const newData = data.search;

        setResults((prev) =>
          prev
            ? {
                ...newData,
                results: [...prev.results, ...newData.results],
              }
            : newData
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQueryData();
  }, [debouncedSearchQuery, page]);

  // 🔹 Clear search input
  const handleRemoveSearchedHadith = () => setSearchQuery("");
  return (
    <div className="pt-20 container mx-auto px-2">
      {/* Title */}
      <div className="text-center font-bold">
        <h1 className="sm:text-5xl text-2xl text-primary">بحث في القرآن</h1>
        <p className="sm:text-2xl text-lg mt-3 text-muted-foreground">
          ابحث في آيات القرآن الكريم بسهولة ودقة، واكتشف المواضع التي وردت فيها
          الكلمات التي تبحث عنها.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-background border-primary border p-2 rounded-lg w-full relative mt-6">
        <input
          value={searchQuery}
          placeholder="ابحث عن الآية..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full outline-none text-xl text-center"
        />
        {searchQuery && (
          <button
            onClick={handleRemoveSearchedHadith}
            className="absolute top-1/2 -translate-y-1/2 right-4 p-1 rounded-full hover:bg-primary/20 active:bg-primary/30 transition cursor-pointer"
          >
            <IoClose size={22} />
          </button>
        )}
      </div>

      {/* Results Count */}
      {results && results?.results?.length !== 0 && (
        <p className="text-2xl sm:text-4xl pt-5 text-right text-muted-foreground">
          عدد النتائج: {results.total_results}
        </p>
      )}

      {/* Results List */}
      <div className="flex gap-5 py-5 flex-col">
        {results ? (
          results.results.length !== 0 ? (
            results.results.map((result, i) => (
              <SearchQuranAyah key={i} result={result} />
            ))
          ) : (
            <NotFoundQuranAyah Query={debouncedSearchQuery} />
          )
        ) : null}

        {/* Loading Indicator */}
        {isLoading && <SearchQuranLoading />}
      </div>

      {/* Load More Button */}
      {results &&
        results.results.length > 0 &&
        page < results.total_pages &&
        !isLoading && (
          <button
            className="bg-muted border-primary border p-3 rounded-full min-w-[250px] font-bold cursor-pointer hover:bg-primary hover:text-background active:bg-primary mx-auto flex justify-center text-center text-lg sm:text-2xl transition my-5"
            onClick={() => setPage((prev) => prev + 1)}
          >
            المزيد من النتائج
          </button>
        )}
    </div>
  );
};

export default SearchQuran;
