// HadithLoading.tsx
import React from "react";

interface HadithLoadingProps {
  count?: number; // number of skeletons to show
}

const HadithLoading: React.FC<HadithLoadingProps> = ({ count = 5 }) => {
  return (
    <div className="min-h-[200px] flex flex-col gap-5 animate-pulse w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-background flex flex-col items-center justify-center gap-5 p-5 rounded-lg shadow-lg"
        >

          {/* Text placeholder */}
          <div className="w-full flex flex-col gap-3">
            <div className="bg-muted h-5 rounded w-3/4 self-end"></div>
            <div className="bg-muted h-5 rounded w-5/6 self-end"></div>
            <div className="bg-muted h-5 rounded w-2/3 self-end"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HadithLoading;
