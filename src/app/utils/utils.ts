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