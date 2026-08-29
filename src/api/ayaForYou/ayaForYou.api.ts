import { quran_api } from "../api";
import { ayaForYouResponse } from "../../types/ayaForYou.types";

export const getAyaForYou = async(): Promise<ayaForYouResponse> => {
    const { data } = await quran_api.get<ayaForYouResponse>("/random");
    return data
}