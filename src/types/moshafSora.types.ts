export type MoshafSorafVerses = {
    arabic: string;
    ayah : number;
    verse_key : string;
}

export type MoshafSoraDetails = {
    bismillah_pre : boolean;
    name_arabic : string;
    name_english: string;
    name_translation: string;
    number: number;
    revelation_order: number;
    revelation_place: string;
    verses_count: number;
}

export type MoshafSora = {
    surah : MoshafSoraDetails;
    verses : MoshafSorafVerses[];
}

export type Surah = {
  number: number;
  name: string;
  revelation_order: number;
  bismillah_pre: boolean;
  revelation: "مكية" | "مدنية";
  verses_count: number;
  pages: [number, number];
};