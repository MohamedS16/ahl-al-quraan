export type surahAudioDetails = {
    reciterName : string,
    surahName: string,
    rewaya: string,
    type : string,
    reciterId: string, 
    surahNumber: number,
    surahList: string[],
    server: string,
    url: string
} 

export type audioType = {
    name: string;
    url: string;
}

export type audioContextData = {
    audioDetails: audioType | null,
    setAudioDetails : (n : audioType)=>void
}
