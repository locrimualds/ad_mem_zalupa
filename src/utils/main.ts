export const cardNumFormat = (num: string | number): string => {
  return num
    .toString()
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const balanceFormat = (num: number): string => {
  return new Intl.NumberFormat("ru-RU").format(num);
};

export const getFormatedDate = (target: string) => {
  const date = new Date(target);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    `${pad(date.getUTCDate())}.` +
    `${pad(date.getUTCMonth() + 1)}.` +
    `${date.getUTCFullYear()} - ` +
    `${pad(date.getUTCHours())}:` +
    `${pad(date.getUTCMinutes())}:` +
    `${pad(date.getUTCSeconds())}`
  );
};
