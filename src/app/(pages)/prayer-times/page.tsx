"use client";
import { MonthsInArabic, PrayerTimesInArabic } from "@/app/Data/Data";
import { useEffect, useState, useMemo } from "react";
import { convertTo12H } from "@/app/utils/utils";
import PrayerTimesLoadingSkeleton from "@/app/Components/PrayerTimes/PrayerTimesLoadingSkeleton";
import LocationNotProvided from "@/app/Components/PrayerTimes/LocationNotProvided";

interface DayInfo {
  weekDay: string;
  gregorian: { day: string; month: string; year: string };
  hijri: { day: string; month: string; year: string };
}

interface PrayerTimesProps {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const PrayerTimes = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [dateInfo, setDateInfo] = useState<DayInfo | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [geoError, setGeoError] = useState<string | null>(null);

  // 🕒 update current time every minutes
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  // 📍 get geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("المتصفح لا يدعم تحديد الموقع الجغرافي.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition(pos),
      () => setGeoError("يرجى السماح للوصول إلى الموقع لتحديد مواقيت الصلاة.")
    );
  }, []);

  // 🌙 fetch prayer times
  useEffect(() => {
    if (!position) return;

    const fetchPrayers = async () => {
      try {
        setIsLoading(true);
        const api = `${process.env.NEXT_PUBLIC_PRAYER_TIME_API}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&method=2`;
        const res = await fetch(api);
        const data = await res.json();
        const { timings, date } = data.data;

        setDateInfo({
          weekDay: date.hijri.weekday.ar,
          gregorian: {
            day: date.gregorian.day,
            month: date.gregorian.month.en,
            year: date.gregorian.year,
          },
          hijri: {
            day: date.hijri.day,
            month: date.hijri.month.ar,
            year: date.hijri.year,
          },
        });

        setPrayerTimes({
          Fajr: timings.Fajr,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        });
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrayers();
  }, [position]);

  // 🕌 determine next prayer
  const nextPrayerKey = useMemo(() => {
    if (!prayerTimes) return null;
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const ordered = Object.entries(prayerTimes).map(([key, time]) => {
      const [h, m] = time.split(":").map(Number);
      return { key, total: h * 60 + m };
    });
    const upcoming = ordered.find(({ total }) => total > now);
    return upcoming ? upcoming.key : ordered[0].key;
  }, [prayerTimes, currentTime]);

  if (geoError) return <LocationNotProvided error={geoError} />;

  return (
    <div className="container mx-auto px-2">
      <div className="pt-20 text-center font-bold">
        <h1 className="text-3xl sm:text-6xl">مواقيت الصلاة</h1>

        {/* 🗓️ Date Info */}
        {dateInfo && (
          <>
            <h6 className="text-primary mt-20 font-bold text-5xl">
              {dateInfo.weekDay}
            </h6>
            <p className="text-3xl pt-2">
              {convertTo12H(
                currentTime.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // keep 24h format before conversion
                })
              )}
            </p>
            <div className="flex justify-between items-center mt-10 text-lg sm:text-3xl font-bold text-primary">
              <p>
                {dateInfo.gregorian.day}/
                {
                  MonthsInArabic[
                    dateInfo.gregorian.month as keyof typeof MonthsInArabic
                  ]
                }
                /{dateInfo.gregorian.year}
              </p>
              <p>
                {dateInfo.hijri.day}/{dateInfo.hijri.month}/
                {dateInfo.hijri.year}
              </p>
            </div>
          </>
        )}

        {/* 🕌 Prayer Times / Loading Skeleton */}
        <div className="flex items-center flex-col gap-5 mt-10">
          {isLoading ? (
            <PrayerTimesLoadingSkeleton />
          ) : (
            Object.entries(prayerTimes ?? {}).map(([key, value]) => {
              const isNext = key === nextPrayerKey;
              return (
                <div
                  key={key}
                  className={`flex justify-between w-full text-primary font-bold text-2xl sm:text-3xl p-4 rounded-lg max-w-[1200px] mx-auto bg-muted border-2 transition cursor-pointer ${
                    isNext
                      ? "border-primary shadow-lg"
                      : "border-foreground hover:border-primary hover:scale-105 active:border-primary active:scale-105"
                  }`}
                >
                  <p>{convertTo12H(value)}</p>
                  <p>
                    {
                      PrayerTimesInArabic[
                        key as keyof typeof PrayerTimesInArabic
                      ]
                    }
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
