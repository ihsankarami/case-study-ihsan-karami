export const formatThousand = (number) => {
  const formatedNumber = new Intl.NumberFormat("de-DE").format(number);
  return formatedNumber;
};
