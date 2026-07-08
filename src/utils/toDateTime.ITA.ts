const toDateTimeITA = (isoString: string | null | undefined): string => {
  if (!isoString) return "Non definita";

  return new Date(isoString).toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default toDateTimeITA;
