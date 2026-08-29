import { useQuery } from "@tanstack/react-query";
import {getPrayerTimes} from "./prayerTimes.api";
import { prayerTimesParams } from "../../types/prayerTimes.types";

export const usePrayerTimes = (params: prayerTimesParams) => {
  return useQuery({
    queryKey: ["prayer-times"],
    queryFn: () => getPrayerTimes(params),
  });
};
