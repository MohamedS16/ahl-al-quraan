import axios from "axios"
import { useEffect, useState } from "react"
import styles from './prayertimes.module.css'
import {changeTimeToArabic} from "../../utils/changeNumbersToArabic"

type prayerDetails = {
    "timings": {
        "Fajr": string,
        "Sunrise": string,
        "Dhuhr": string,
        "Asr": string,
        "Maghrib": string,
        "Isha": string
    },
    "date": {
        "hijri": {
            "date": string,
            "weekday": {
                "ar": string
            },
            "month": {
                "ar": string
            },
            "year": string,
        },
    }}

const PrayerTimes = () => {
    const [prayers, setPrayers] = useState <prayerDetails>()

    useEffect(() => {
        const year = new Date().getFullYear()
        const month = String(new Date().getMonth() + 1).padStart(2, '0')
        const day = new Date().getDate().toString().padStart(2, '0')

        axios.get(`https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=cairo&country=Egypt&method=5`)
            .then((resp) =>setPrayers(resp.data.data))
            .catch(er => console.log(er))
    }, [])
    return (
        <section className={styles.prayerTimes}>
            <h2> مواقيت الصلاة - القاهرة </h2>
            <div className={styles.prayerTimes_content}>
                <div className={styles.prayerTimes_prayer}> <p> الفجر </p>  <p> {changeTimeToArabic(`${prayers?.timings.Fajr}`)} </p></div>
                <div className={styles.prayerTimes_prayer}> <p> الشروق </p>  <p> {changeTimeToArabic(`${prayers?.timings.Sunrise}`)} </p></div>
                <div className={styles.prayerTimes_prayer}> <p> الظهر </p>  <p> {changeTimeToArabic(`${prayers?.timings.Dhuhr}`)} </p></div>
                <div className={styles.prayerTimes_prayer}> <p> العصر </p>  <p> {changeTimeToArabic(`${prayers?.timings.Asr}`)} </p></div>
                <div className={styles.prayerTimes_prayer}> <p> المغرب </p>  <p> {changeTimeToArabic(`${prayers?.timings.Maghrib}`)} </p></div>
                <div className={styles.prayerTimes_prayer}> <p> العشاء </p>  <p> {changeTimeToArabic(`${prayers?.timings.Isha}`)} </p></div>

            </div>
        </section>
    )
}

export default PrayerTimes