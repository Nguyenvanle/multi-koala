export const dateFormatter = (date: Date) => {
  const formattedDate = new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};
