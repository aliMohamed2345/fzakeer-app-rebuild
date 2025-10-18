"use client";
import React from "react";

const SearchQuranLoading = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      <div className="flex flex-col gap-5 py-5">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="w-full max-w-[1100px] mx-auto bg-muted rounded-3xl border-2 border-background shadow-md overflow-hidden p-6 sm:p-8 animate-pulse relative"
          >
            {/* Header skeleton */}
            <div className="flex justify-between items-center mb-4 border-b border-primary/20 pb-3">
              <div className="h-6 sm:h-8 w-32 sm:w-48 rounded-md bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
              <div className="h-6 sm:h-8 w-20 sm:w-28 rounded-full bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
            </div>

            {/* Ayah text skeleton lines */}
            <div className="flex flex-col gap-3 items-center">
              <div className="h-5 sm:h-7 w-[80%] rounded-md bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
              <div className="h-5 sm:h-7 w-[70%] rounded-md bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
              <div className="h-5 sm:h-7 w-[60%] rounded-md bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchQuranLoading;
