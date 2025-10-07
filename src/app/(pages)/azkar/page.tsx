"use client";
import { azkarCategories, azkar } from "@/app/Data/Data";
import { useState, useRef, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { copyToClipBoard } from "@/app/utils/utils";
import Alert from "@/app/Components/Home/Alert";

interface zekrProps {
  category: string;
  count: string;
  description: string;
  reference: string;
  content: string;
}

const Azkar = () => {
  const [currentCategory, setCurrentCategory] =
    useState<string>("أذكار الصباح");
  const [azkarData, setAzkarData] = useState<zekrProps[]>(
    azkar["أذكار الصباح"]
  );
  const [counts, setCounts] = useState<number[]>([]); 
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollToRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    const selectedAzkar = azkar[currentCategory as keyof typeof azkar];
    setAzkarData(selectedAzkar);
    // 🧠 reset counters each time category changes
    const initialCounts = selectedAzkar.map((z) => parseInt(z.count));
    setCounts(initialCounts);
  }, [currentCategory]);

  const handleCopy = (text: string) => {
    copyToClipBoard(text);
    setShowAlert(false);
    setTimeout(() => setShowAlert(true), 0);
  };

  const handleCountClick = (index: number) => {
    setCounts((prev) => prev.map((c, i) => (i === index && c > 0 ? c - 1 : c)));
  };

  return (
    <>
      <div className="pt-20 text-center font-bold">
        <h1 className="text-3xl sm:text-6xl">الأذكار</h1>
        <h4 className="text-muted-foreground text-xl sm:text-2xl pt-2">
          أذكار الصباح والمساء للمداومة على ذكر الله
        </h4>
      </div>

      <div className="p-4 rounded-lg w-full max-w-[1200px] bg-primary mx-auto my-6 border-background-foreground border-2">
        {/* Category buttons */}
        <div className="bg-muted flex items-center gap-2 p-2 rounded-md overflow-x-auto sm:justify-center border-background-foreground border-2">
          <button
            onClick={scrollToLeft}
            className="bg-card p-2 rounded-full hover:bg-primary hover:text-accent transition lg:hidden"
          >
            <IoIosArrowBack size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide"
          >
            {azkarCategories.map((category, i) => (
              <button
                key={i}
                onClick={() => setCurrentCategory(category)}
                className={`bg-card cursor-pointer whitespace-nowrap px-4 py-2 font-bold rounded-lg text-base sm:text-lg hover:bg-primary hover:text-accent transition-all ${
                  category === currentCategory && "bg-primary text-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={scrollToRight}
            className="bg-card p-2 rounded-full hover:bg-primary hover:text-accent transition lg:hidden"
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>

        {/* Azkar content */}
        <div className="h-[600px] overflow-y-auto scrollable-hide mt-4">
          {azkarData.map((zekr, i) => (
            <div
              key={i}
              className="min-h-[200px] p-4 rounded-lg bg-background my-5 group flex items-center justify-center flex-col shadow-lg"
            >
              <div className="flex items-start justify-between font-bold">
                <button
                  onClick={() => handleCopy(zekr.content)}
                  className="text-muted-foreground hover:text-accent transition rounded-xl p-2 hover:bg-muted cursor-pointer opacity-0 group-hover:opacity-100"
                >
                  <MdContentCopy size={20} />
                </button>
                <p className="text-base text-right sm:text-2xl">
                  {zekr.content}
                </p>
              </div>
              <p className="text-sm sm:text-lg font-bold text-muted-foreground self-start">
                {zekr.description}
              </p>

              {/* 🧠 Counter button */}
              <button
                onClick={() => handleCountClick(i)}
                disabled={counts[i] <= 0}
                className={`p-3 w-12 h-12 cursor-pointer active:scale-90 transition-all rounded-full my-4 mx-auto flex justify-center items-center text-base sm:text-xl font-bold ${
                  counts[i] > 0
                    ? "bg-primary text-accent"
                    : "bg-destructive text-background-foreground cursor-not-allowed opacity-50"
                }`}
              >
                {counts[i] > 0 ? counts[i] : "0"}
              </button>
            </div>
          ))}
        </div>

        {/* Alert */}
        {showAlert && (
          <Alert
            title="تم النسخ"
            description="تم نسخ الذكر إلى الحافظة"
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
    </>
  );
};

export default Azkar;
