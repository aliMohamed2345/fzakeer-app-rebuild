
const PrayerTimesLoadingSkeleton = () => {
  return (
    <div className="flex justify-between w-full text-primary font-bold text-2xl sm:text-3xl p-4 rounded-lg max-w-[1200px] mx-auto bg-muted border-2 border-foreground animate-pulse">
      <div className="w-24 h-6 bg-gray-400/40 rounded"></div>
      <div className="w-32 h-6 bg-gray-400/40 rounded"></div>
    </div>
  );
};

export default PrayerTimesLoadingSkeleton;
