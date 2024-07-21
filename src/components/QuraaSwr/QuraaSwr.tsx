import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from './QuraaSwr.module.css'

type qaree = {
  id : number,
  letter : string,
  name : string,
  moshaf : [
    {
      id : number,
      moshaf_type : number,
      name : string,
      server : string,
      surah_list : string,
      surah_total : number
    }
  ]
}

type swr = [{
  id: number,
  name: string ,
  start_page: number,
  end_page: number,
  makkia: number,
  type: number
}]

const QuraaSwr = () => {
  
    const [reciter,setReciter] = useState <qaree>()
    const [swrNames,setSwrNames] = useState <swr>()
    const [loading,setLoading] = useState(true)
    const params = useParams()

    useEffect(()=>{
        axios.get(`https://mp3quran.net/api/v3/reciters?reciter=${params.id}`)
        .then((res)=>setReciter(res.data.reciters[0]))
        .catch(er=>console.log(er))
        axios.get('https://mp3quran.net/api/v3/suwar').then(res=>setSwrNames(res.data.suwar)).catch(er=>console.log(er))
    },[])  
  
    return (
    <section className={styles.quraaswr}>
      <div className={styles.container}>
        {
          // loading ? <p>Loading...</p> : 
          <>
            <div className={styles.qardetails}>
              <h1> {reciter?.name} </h1>
            </div>
            <div className={styles.swrContainer}>
              {
                reciter?.moshaf[0].surah_list.split(',').map(su=>swrNames?.map((s)=> +su === s.id && <p key={s.id}>{s.name}</p>))
              }
            </div>
          </>
        }
      </div>
    </section>
  )
}

export default QuraaSwr