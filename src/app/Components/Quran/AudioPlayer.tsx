"use client";

import { useEffect, useRef, useState } from "react";
import { QuranSurahs } from "@/app/Data/Data";
import {
  TbPlayerTrackNextFilled,
  TbPlayerSkipBackFilled,
  TbPlayerPlayFilled,
  TbPlayerSkipForwardFilled,
  TbPlayerTrackPrevFilled,
  TbPlayerPauseFilled,
} from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import {
  IoMdVolumeOff,
  IoMdVolumeHigh,
  IoMdVolumeLow,
  IoMdVolumeMute,
} from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { formatTime, surahIdFormat } from "@/app/utils/utils";

interface AudioPlayerProps {
  audioLink: string;
  setIsPlayerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioPlayer = ({ audioLink, setIsPlayerOpen }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentAudioLink, setCurrentAudioLink] = useState<string>(audioLink);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSurahName, setCurrentSurahName] = useState<string>("");

  // Extract surah ID from audio file URL
  const getSurahIdFromUrl = (url: string): string => {
    if (!url) return "001";
    const parts = url.split("/");
    if (parts.length === 0) return "001";

    const filename = parts[parts.length - 1];
    if (!filename) return "001";

    return filename.slice(0, 3) || "001";
  };

  // React to prop changes (when a new surah is clicked from outside)
  useEffect(() => {
    if (audioLink !== currentAudioLink) {
      setIsLoading(true);
      setCurrentAudioLink(audioLink);
      setIsPlaying(true);
    }
  }, [audioLink]);

  // Update surah name on audio change
  useEffect(() => {
    const surahId = getSurahIdFromUrl(currentAudioLink);
    const surahNumber = parseInt(surahId, 10);
    const found = QuranSurahs.find((surah) => surah.number === surahNumber);
    if (found) {
      setCurrentSurahName(found.name);
    } else {
      setCurrentSurahName("");
    }
  }, [currentAudioLink]);

  // Animate player in
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  // Audio setup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentAudioLink]);

  // Play/pause effect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error("Auto play failed:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // === Control Handlers ===
  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => {
      const newMute = !prev;
      if (audioRef.current) audioRef.current.muted = newMute;
      return newMute;
    });
  };

  const skipForward = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.min(
        audioRef.current.currentTime + seconds,
        duration
      );
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const skipBackward = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - seconds, 0);
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsPlayerOpen(false), 300);
  };

  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) return <IoMdVolumeOff size={20} />;
    if (volume >= 0.7) return <IoMdVolumeHigh size={20} />;
    if (volume >= 0.3) return <IoMdVolumeLow size={20} />;
    return <IoMdVolumeMute size={20} />;
  };

  const handleNavigateSurah = (isNextSurah = true) => {
    try {
      const parts = currentAudioLink.split("/");
      if (parts.length < 2) return;

      const baseURL = parts.slice(0, parts.length - 2).join("/");
      const reciter = parts[parts.length - 2];
      const filename = parts[parts.length - 1];
      const currentSurahId = parseInt(filename.slice(0, 3), 10);

      const newSurahId = isNextSurah ? currentSurahId + 1 : currentSurahId - 1;
      if (newSurahId < 1 || newSurahId > 114) return;

      const newAudio = `${baseURL}/${reciter}/${surahIdFormat(newSurahId)}.mp3`;
      setIsLoading(true);
      setCurrentAudioLink(newAudio);
      setIsPlaying(true);
    } catch (err) {
      console.error("Surah navigation error:", err);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentAudioLink}
        muted={isMuted}
        autoPlay
        preload="auto"
      />

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed bottom-[110px] sm:bottom-[140px] right-4 z-50 p-1 rounded-full bg-background border border-primary/30 hover:bg-primary/10 transition cursor-pointer shadow-md"
        aria-label="إغلاق المشغل"
      >
        <IoClose size={20} />
      </button>

      {/* Audio Player UI */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-background border-t border-primary/20 px-3 sm:px-6 py-4 shadow-lg flex flex-col items-center justify-center gap-3 z-40 transition-all duration-300 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        }`}
      >
        <div className="text-center text-primary text-lg font-bold sm:text-2xl">
          سوره {currentSurahName}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-1 sm:gap-4">
          <button
            onClick={() => skipBackward(10)}
            className="hover:bg-muted transition rounded-full p-2 cursor-pointer"
          >
            <TbPlayerTrackPrevFilled size={22} />
          </button>

          <button
            disabled={getSurahIdFromUrl(currentAudioLink) === "001"}
            onClick={() => handleNavigateSurah(false)}
            className="hover:bg-muted transition rounded-full p-2 disabled:opacity-30 cursor-pointer"
          >
            <TbPlayerSkipBackFilled size={22} />
          </button>

          <button
            onClick={handlePlayPause}
            className="p-3 sm:p-4 rounded-full bg-primary text-background hover:scale-105 transition cursor-pointer"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={15} />
            ) : isPlaying ? (
              <TbPlayerPauseFilled size={15} />
            ) : (
              <TbPlayerPlayFilled size={15} />
            )}
          </button>

          <button
            disabled={getSurahIdFromUrl(currentAudioLink) === "114"}
            onClick={() => handleNavigateSurah(true)}
            className="hover:bg-muted transition rounded-full p-2 disabled:opacity-30"
          >
            <TbPlayerSkipForwardFilled size={22} />
          </button>

          <button
            onClick={() => skipForward(10)}
            className="hover:bg-muted transition rounded-full p-2 cursor-pointer"
          >
            <TbPlayerTrackNextFilled size={22} />
          </button>

          {/* Volume (Mobile) */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={handleMuteToggle}
              className="text-sm hover:bg-muted rounded-full transition cursor-pointer"
            >
              {renderVolumeIcon()}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="accent-primary cursor-pointer w-12"
            />
          </div>
        </div>

        {/* Volume + Progress (Desktop) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full max-w-[700px]">
          {/* Volume (Desktop) */}
          <div className="items-center gap-2 hidden sm:flex">
            <button
              onClick={handleMuteToggle}
              className="text-xl hover:bg-muted p-2 rounded-full transition cursor-pointer"
            >
              {renderVolumeIcon()}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="accent-primary cursor-pointer w-28 sm:w-36"
            />
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-sm text-muted-foreground w-10 text-end sm:text-xl">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              className="w-full accent-primary cursor-pointer"
            />
            <span className="text-sm sm:text-xl text-muted-foreground w-10 text-start">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
