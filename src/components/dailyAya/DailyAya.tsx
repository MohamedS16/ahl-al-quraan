import axios from "axios"
import { useEffect, useState } from "react"
import styles from './dailyaya.module.css'
import changeNumbersToArabic from "../../utils/changeNumbersToArabic"

type resp = {
    text : string,
    numberInSurah : number
    surah : {
        name : string,
        number : number
    }
}

const DailyAya = () => {

    const [ ayah, setAyah] = useState<resp | null>({} as resp)

    useEffect(()=>{
        let rand = Math.round(Math.random() * 6235) + 1
        axios.get(`https://api.alquran.cloud/v1/ayah/${rand}`)
        .then(res=>setAyah(res.data.data))
        .catch(er=>console.log(er))
    },[])

  return (
    <section className={styles.ayahContainer}>
        <h2> اية لك </h2>
        {
            ayah?.surah ?
            <>
            <p>{ayah?.text}</p>
            <div className={styles.ayahDetails}>
                <p>{ayah?.surah?.name + " الاية رقم " + changeNumbersToArabic(`${ayah?.numberInSurah}`)}</p>
                <p> </p>
            </div>
            </> : <p className={styles.loading}>يتم اختيار اية لك...</p>
        }
    </section>
  )
}

export default DailyAya