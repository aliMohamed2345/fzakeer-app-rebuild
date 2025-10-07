export const copyToClipBoard = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy text", error);
  }
};