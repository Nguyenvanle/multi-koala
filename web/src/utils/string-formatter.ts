export const capitalizeString = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const spaceString = (name: string): string => {
  // Add space before capital letters, but skip the first character
  return name.replace(/([A-Z])/g, (match, offset) => {
    // Don't add space if it's the first character
    return offset === 0 ? match : " " + match;
  });
};
