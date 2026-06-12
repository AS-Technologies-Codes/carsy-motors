export function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      // Keep the first word lowercase, capitalize the rest
      return index === 0 
        ? word 
        : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}