export type ayaForYouResponse = {
  success: boolean;
  service: string;
  data: {
    surah: {
      number: number;
      name_arabic: string;
      name_english: string;
      name_translation: string;
    };
    verse: {
      verse_key: string;
      ayah: number;
      arabic: string;
      transliteration: string;
      translations: {
        sahih_international: string;
        pickthall: string;
        yusuf_ali: string;
        urdu: string;
        turkish: string;
        indonesian: string;
        french: string;
        german: string;
        bengali: string;
        spanish: string;
        malay: string;
        bosnian: string;
      };
    };
    audio: [
      {
        reciter_id: number;
        reciter: string;
        style: string;
        surah_audio: string;
        ayah_audio: string;
      }
    ];
    total_verses_in_quran: number;
  };
  timestamp: string;
  api_info: {
    sadaqah_jariah: string;
  };
};
