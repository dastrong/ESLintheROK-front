export const checkIfNew = (dateToCheck: string, dayCount = 1) => {
  if (!dateToCheck) return false;
  const oneDayInMs = 1000 * 60 * 60 * 24;
  return new Date(dateToCheck).getTime() > Date.now() - oneDayInMs * dayCount;
};
