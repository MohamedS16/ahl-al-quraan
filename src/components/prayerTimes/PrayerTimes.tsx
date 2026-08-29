import changeNumbersToArabic from "../../utils/changeNumbersToArabic";
import { MapPin } from "lucide-react";
import { prayerTimesParams } from "../../types/prayerTimes.types";
import { usePrayerTimes } from "../../api/prayerTimes/prayerTimes.queries";
import {getPrayerNameArabic} from "../../utils/changePrayerNameToArabic";

const PrayerTimes = () => {
    
    const params : prayerTimesParams = {
        lat: 30.0444,
        lng: 31.2357,
        method: "Egyptian"
    }
    
    const {data: prayers, isLoading, error} = usePrayerTimes(params);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error fetching prayer times.</p>;
    }

    const NEXT = prayers?.data?.current_status?.next_prayer;
    return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">مواقيت الصلاة</h2>
          <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <MapPin className="size-4 shrink-0" />
            القاهرة، مصر
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
          الصلاة القادمة: { NEXT && getPrayerNameArabic(NEXT)}
        </span>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {prayers?.data?.prayer_times && Object.entries(prayers.data.prayer_times).map(([name, time]) => {
            const active = name === NEXT;
            
            return (
            <div
              key={name}
              className={`flex items-center justify-between rounded-2xl border px-5 py-4 ${
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-(--shadow-soft)"
                  : "border-border bg-card text-ink"
              }`}
            >
              <span className="text-base font-extrabold">{getPrayerNameArabic(name)} </span>
              <span
                className={`text-lg font-bold tabular-nums ${active ? "" : "text-primary"}`}
              >
                {changeNumbersToArabic(time)}</span></div>
        )}
        )}
      </div>


    </section>
  );
};

export default PrayerTimes;
