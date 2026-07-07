export function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      // Keep the first word lowercase, capitalize the rest
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export const fomatePrice = (price) => {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0, // Limits decimals to 2 places
  }).format(price);
};
