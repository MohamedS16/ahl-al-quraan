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


export {
    mp3_quran_api,
    tafseer_api,
    prayer_times_api,
    quran_api
}