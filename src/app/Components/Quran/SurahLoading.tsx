// File: app/Components/Quran/SurahLoading.tsx
"use client";

const SurahLoading = () => {
  return (
    <div className="pt-24 animate-pulse">
      {/* Surah Title */}
      <div className="text-center">
        <div className="h-10 sm:h-16 w-48 sm:w-72 bg-muted mx-auto rounded-lg mb-4" />
        <div className="h-4 sm:h-6 w-80 sm:w-[500px] bg-muted-foreground/30 mx-auto rounded-md" />
      </div>

      {/* Main Content */}
      <div className="p-8 rounded-3xl w-full max-w-[1100px] bg-gradient-to-br from-background to-muted/70 mx-auto my-10 border border-primary/30 shadow-lg backdrop-blur-md">
        {/* Bismillah */}
        <div className="h-6 sm:h-10 w-64 sm:w-80 bg-muted mx-auto mb-8 rounded-lg" />

        {/* Ayahs Skeleton */}
        <div className="h-[600px] overflow-y-auto flex flex-col gap-6 px-4 sm:px-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted/60 border border-primary/20 rounded-xl p-4 sm:p-6"
            >
              <div className="h-4 sm:h-5 w-3/4 bg-muted-foreground/30 rounded mb-2"></div>
              <div className="h-4 sm:h-5 w-full bg-muted-foreground/20 rounded mb-2"></div>
              <div className="h-4 sm:h-5 w-1/2 bg-muted-foreground/20 rounded"></div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center my-5 justify-between">
          <div className="bg-muted border border-primary rounded-lg p-3 w-24 sm:w-32 h-10 sm:h-12"></div>
          <div className="bg-muted border border-primary rounded-lg p-3 w-24 sm:w-32 h-10 sm:h-12"></div>
        </div>
      </div>
    </div>
  );
};

export default SurahLoading;
