import {prayer_times_api} from "../api";
import {prayerTimesResponse, prayerTimesParams} from "../../types/prayerTimes.types";

export const getPrayerTimes = async (params: prayerTimesParams): Promise<prayerTimesResponse> => {
  const response = await prayer_times_api.get<prayerTimesResponse>("/", { params });
  return response.data;
};