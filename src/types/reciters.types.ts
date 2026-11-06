export type recitersResponse = {
    reciters : singleReciter[]
}

export type singleReciter = {
    id: string,
    name: string,
    letter: string,
    moshaf: moshafReciter[]
}

export type moshafReciter = {
    id: string,
    name: string,
    rewaya_id: string,
    server: string,
    surah_total: string,
    moshaf_type: string,
    surah_list: string
}