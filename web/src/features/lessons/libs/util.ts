export const extractVideoId = (url: string): string => {
  const regex =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
};
