const commaNumber = require('comma-number');

/**
 * 콤마 추가
 * @param num
 */
export const addComma = (num: number | null | undefined): string => {
  if (!num) return "0";
  return commaNumber(num);
};
