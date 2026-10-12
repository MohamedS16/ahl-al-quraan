import {ayah_tafseer_api} from './../api';
import { tafsserTypes } from "../types/tafseer.types";

export const getAyahTafseer = async (tafsir: tafsserTypes, surahNumber: number, ayahNumber: number) => {
  const response = await ayah_tafseer_api.get(`/${tafsir}/surah/${surahNumber}/ayah/${ayahNumber}`);
  return response.data.data;
};

