"use client";

const SavedAyahLoading = () => {
  return (
    <div className="flex flex-col gap-5 py-10 mx-auto w-full max-w-[1100px]">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="bg-muted p-5 sm:p-8 rounded-3xl border-2 border-background shadow-lg animate-pulse"
          >
            {/* Header Skeleton */}
            <div className="flex items-center justify-between flex-wrap mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/30 rounded-full"></div>
                <div className="h-6 sm:h-7 w-32 bg-primary/30 rounded"></div>
              </div>
              <div className="h-6 sm:h-7 w-20 bg-primary/30 rounded-full"></div>
            </div>

            {/* Ayah Text Skeleton */}
            <div className="h-6 sm:h-8 w-full bg-primary/20 rounded mb-3"></div>
            <div className="h-6 sm:h-8 w-4/5 bg-primary/20 rounded mx-auto mb-4"></div>

            {/* Meta Info Skeleton */}
            <div className="flex justify-center sm:justify-between flex-wrap gap-3 border-t border-primary/20 pt-3">
              <div className="h-5 sm:h-6 w-24 bg-primary/20 rounded"></div>
              <div className="h-5 sm:h-6 w-24 bg-primary/20 rounded"></div>
              <div className="h-5 sm:h-6 w-24 bg-primary/20 rounded"></div>
              <div className="h-5 sm:h-6 w-24 bg-primary/20 rounded"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SavedAyahLoading;
