export const copyToClipBoard = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy text", error);
  }
};
export const convertTo12H = (time: string) => {
  if (!time) return;

  const hours = +time.slice(0, 2);
  const minutes = +time.slice(3);

  const period = hours >= 12 ? "PM" : "AM";
  const convertedHours = hours % 12 || 12; // converts 0 -> 12, 13 -> 1, etc.
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${convertedHours}:${formattedMinutes} ${period}`;
};
export function calculateHizb(hizbQuarter: number): string {
  const hizb = Math.floor(hizbQuarter / 4);
  const fraction = hizbQuarter % 4;
  switch (true) {
    case hizbQuarter > 4 && fraction === 3:
      return `ثلاثة ارباع الحزب ${hizb}`;
    case hizbQuarter > 4 && fraction === 2:
      return `نصف الحزب ${hizb}`;
    case hizbQuarter > 4 && fraction === 1:
      return `ربع الحزب ${hizb}`;
    case hizbQuarter > 4 && fraction === 0:
      return `الحزب ${hizb + 1}`;
    case hizbQuarter < 4 && fraction === 3:
      return `ثلاثة ارباع الحزب الاول`;
    case hizbQuarter < 4 && fraction === 2:
      return `نصف الحزب الاول`;
    case hizbQuarter < 4 && fraction === 1:
      return `ربع الحزب الاول`;
    default:
      return `1`;
  }
}
export const handleDownloadSurah = async (
  AudioSrc: string,
  DownloadFileName: string
) => {
    if(!AudioSrc ||!DownloadFileName)return
  try {
    // Fetch the audio file as a blob
    const response = await fetch(AudioSrc);
    const blob = await response.blob();
    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);
    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", DownloadFileName);
    document.body.appendChild(link);
    link.click();
    // Clean up by revoking the object URL and removing the link element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

export const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600); // Calculate the number of hours
    const minutes = Math.floor((time % 3600) / 60); // Calculate the remaining minutes
    const seconds = Math.floor(time % 60); // Calculate the remaining seconds
    return `${hours > 0 ? `${hours < 10 ? "0" : ""}${hours}:` : ""}${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
   export const surahIdFormat = (surahId: number) => {
    if (!surahId) return;
    return surahId < 10
      ? `00${surahId}`
      : surahId < 100
      ? `0${surahId}`
      : `${surahId}`;
  };