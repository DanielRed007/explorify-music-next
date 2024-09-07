export const mapMilisecondsToMinutes = (duration: number): string => {
  return `${Math.floor(duration / 60000)}:${((duration % 60000) / 1000).toFixed(
    0
  )}`;
};
