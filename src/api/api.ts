import axios from "axios";

const mp3_quran_api = axios.create({
    baseURL : import.meta.env.MP3_QURAN_BASE_URL,
    headers : {"Content-Type": "application/json"}
});

export {
    mp3_quran_api
}