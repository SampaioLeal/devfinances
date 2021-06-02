const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {});

export function formatCurrency(number: number) {
  return currencyFormatter.format(number);
}

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}
