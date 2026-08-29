const ARABIC_NUMBERS : string[] = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']

export const changeNumbersToArabic = (value: string | number): string => {
  return String(value)
    .split("")
    .map((char) => ARABIC_NUMBERS[Number(char)] ?? char)
    .join("");
};

export const changeTimeToArabic = (time: string): string => {
  const [hours, minutes] = time.split(":");

  return `${changeNumbersToArabic(hours)} : ${changeNumbersToArabic(minutes)}`;
};

export default changeNumbersToArabic;