export const formatToLocalDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
