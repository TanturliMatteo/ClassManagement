const checkEndDate = (endDate: Date): boolean => {
  const now = Date.now();
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

  const diff = endDate.getTime() - now;

  return diff >= 0 && diff <= thirtyDaysMs;
};

export default checkEndDate;
