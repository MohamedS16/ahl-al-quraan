import {getAyahTafseer} from "./ayaTafseer.api";
import {useQuery} from "@tanstack/react-query";
import {tafsserTypes} from "./../../types/tafseer.types";

export const useGetAyahTafseer = (tafsir: tafsserTypes, surahNumber: number, ayahNumber: number)=>{
    return useQuery({
        queryKey: ["ayahTafseer", tafsir, surahNumber, ayahNumber],
        queryFn: ()=> getAyahTafseer(tafsir, surahNumber, ayahNumber)
    })
}