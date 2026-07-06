const checkEndDate = (endDate: string | null | undefined): boolean => {
  if (!endDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  return end <= today;
};

export default checkEndDate;
