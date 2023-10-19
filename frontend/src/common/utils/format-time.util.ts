export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesStr =
    minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";

  const secondsStr =
    remainingSeconds > 0
      ? `${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`
      : "";

  if (minutesStr && secondsStr) {
    return `${minutesStr} and ${secondsStr}`;
  }

  if (minutesStr) {
    return minutesStr;
  }

  if (secondsStr) {
    return secondsStr;
  }

  return "0 seconds";
};

export const formatToLocalTime = (date: Date) => {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
