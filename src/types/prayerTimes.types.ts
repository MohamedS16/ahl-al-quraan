export type prayerTimesResponse = {
  data:{
    success: boolean,
    service: string,
    data: {
      date: Date,
      timezone: string,
      location: {
        latitude: number,
        longitude: number
      },
      calculation_method: string,
      madhab: string,
      high_latitude_rule: string,
      prayer_times: {
        imsak: string,
        fajr: string,
        sunrise: string,
        dhuhr: string,
        asr: string,
        maghrib: string,
        isha: string
      },
      prayer_datetimes: {
        imsak: string,
        fajr: string,
        sunrise: string,
        dhuhr: string,
        asr: string,
        maghrib: string,
        isha: string
      },
      islamic_info: {
        prayer_names: {
          fajr: string,
          dhuhr: string,
          asr: string,
          maghrib: string,
          isha: string
        },
        note: string
      },
      current_status: {
        current_prayer: string,
        next_prayer: string,
        time_until_next: string,
        minutes_until_next: string
      }
    },
    timestamp: string,
    api_info: {
      sadaqah_jariah: string,
      usage: string
    }
  }
};

export type prayerTimesParams ={
  lat: number;
  lng: number;
  method: string;
}