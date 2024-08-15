import axios from "axios"
import { useEffect, useState } from "react"
import RadioContent from "./RadioContent"
import RadioPagination from "./RadioPagination"
import styles from './radio.module.css'


type radioType = {
    "id": number,
    "name": string,
    "url": string,
}[]

const Radio = () => {

    const [radios,setRadios] = useState<radioType>([])
    const [currentPage, setCurrentPage] = useState(1)

    const startingPosition = (currentPage * 30) - 30

    useEffect(()=>{
        axios.get('https://mp3quran.net/api/v3/radios').then(resp=>setRadios(resp.data.radios)).catch(er=>console.log(er))
    },[])

  return (
    <section className={styles.radio_container} >
        <RadioContent radioss={radios.slice(startingPosition,startingPosition + 30)} startingPosition={startingPosition} />
        <RadioPagination radiosLength={radios.length} setcurrentPage={setCurrentPage} currentPage={currentPage} />
    </section>
  )
}

export default Radio