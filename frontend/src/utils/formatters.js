export function formatCurrency(currencyString) {
  return currencyString.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatDateTime(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
