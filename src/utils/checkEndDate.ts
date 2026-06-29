const checkEndDate = (endDate: string | null | undefined): boolean => {
  if (!endDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const thirtyDaysLater = new Date(today);
  thirtyDaysLater.setDate(today.getDate() + 30);

  const end = new Date(endDate);
  return end >= today && end <= thirtyDaysLater;
};

export default checkEndDate;
