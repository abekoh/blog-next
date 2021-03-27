export const strToInteger: (s: string) => number | undefined = (s) => {
  const num = parseInt(s);
  return isNaN(num) ? undefined : num;
};
