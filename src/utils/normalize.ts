export function normalizeInput(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, " ");
}

export function cleanOutput(value: string): string {
  const cleaned = value
    .replace(/[,.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "";
  }

  return cleaned
    .split(" ")
    .map(word => {
      if (/^\d/.test(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase();
    })
    .join(" ");
}