const prayerNames: Record<string, string> = {
  imsak: "الإمساك",
  fajr: "الفجر",
  sunrise: "الشروق",
  dhuhr: "الظهر",
  asr: "العصر",
  maghrib: "المغرب",
  isha: "العشاء",
};

export const getPrayerNameArabic = (name: string): string => {
  return prayerNames[name] ?? name;
};
