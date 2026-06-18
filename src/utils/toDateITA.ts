function toDateITA(dateString: string | null | undefined) {
  if (!dateString) return "Non definita";
  return new Date(dateString).toLocaleDateString("it-IT");
}

export default toDateITA;
