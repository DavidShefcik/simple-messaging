export const isValidString = (value: string): boolean =>
  value.replace(/ /g, "").length > 0;
