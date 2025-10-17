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