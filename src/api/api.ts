import axios from "axios";

const mp3_quran_api = axios.create({
    baseURL : import.meta.env.MP3_QURAN_BASE_URL,
    headers : {"Content-Type": "application/json"}
});

const tafseer_api = axios.create({
    baseURL : import.meta.env.TAFSEER_BASE_URL,
    headers : {"Content-Type": "application/json"}
});

const prayer_times_api = axios.create({
    baseURL : import.meta.env.VITE_PRAYER_TIMES_BASE_URL,
    headers : {"Content-Type": "application/json"}
});
const quran_api = axios.create({
    baseURL : import.meta.env.VITE_QURAN_BASE_URL,
    headers : {"Content-Type": "application/json"}
});

// const moshaf_all_swr_api = axios.create({
//     baseURL : import.meta.env.VITE_MOSHAF_ALL_SWR_BASE_URL,
//     headers : {"Content-Type": "application/json"}
// })

const moshaf_sora_api = axios.create({
    baseURL : import.meta.env.VITE_MOSHAF_SORA_BASE_URL,
    headers : {"Content-Type": "application/json"}
})

const ayah_tafseer_api = axios.create({
    baseURL : import.meta.env.VITE_AYAH_TAFSEER_BASE_URL,
    headers : {"Content-Type": "application/json"}
})

const reciters_api =  axios.create({
    baseURL: import.meta.env.VITE_RECITERS_BASE_URL,
    headers: {"Content-Type": "application/json"}
})

const radio_api = axios.create({
    baseURL: import.meta.env.VITE_RADIO_BASE_URL,
    headers: {"Content-Type": "application/json"}
})

export {
    mp3_quran_api,
    tafseer_api,
    prayer_times_api,
    quran_api,
    // moshaf_all_swr_api,
    moshaf_sora_api,
    ayah_tafseer_api,
    reciters_api,
    radio_api
}
