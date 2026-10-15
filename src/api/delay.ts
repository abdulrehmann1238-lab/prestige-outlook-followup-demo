export const delay = (minMs: number = 350, maxMs: number = 900): Promise<void> => {
  const ms = Math.floor(minMs + Math.random() * (maxMs - minMs));
  return new Promise((resolve) => setTimeout(resolve, ms));
};
