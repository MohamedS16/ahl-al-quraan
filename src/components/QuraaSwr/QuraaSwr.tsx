import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import styles from './QuraaSwr.module.css'
import { CiSearch } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import React from "react";
import changeNumbersToArabic from "../../utils/changeNumbersToArabic";


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
    const [rewaya,setRewaya] = useState(0)
    const [search,setSearch] = useState('')
    const params = useParams()
    const [sora,setSora] : any = useState()

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
            <div className={styles.settings}>
              <div className={styles.rewaya}>
                <h3> رواية : </h3>
                <select onChange={(e)=>setRewaya(+e.target.value)}>
                {
                  reciter?.moshaf.map((m,idx)=><option key={m.id} value={idx} onClick={()=>{setRewaya(idx);console.log(rewaya)}}> {m.name} </option>)
                }
                </select>
              </div>

              <div className={styles.search}>
                <input type="text" placeholder=" ابحث عن سورة" onChange={(e)=>setSearch(e.target.value)} />
                <CiSearch />
              </div>
            </div>
            <div className={styles.swrContainer}>
              {
                reciter?.moshaf[rewaya]?.surah_list?.split(',').map(su=>swrNames?.filter((r)=>{
                  if(search === ''){
                    return r
                  }else{
                    return r.name.includes(search)
                  }
                  
                }).map((s)=> +su === s.id && 
                <Link to={`${s.id}`} className={styles.sora} onClick={()=>setSora({...s,moshaf :reciter?.moshaf[rewaya]})}  key={s.id}>
                  <div className={styles.soraname}>
                    <FaPlay />
                    <p> {changeNumbersToArabic(`${s.id}`)} - {s.name} </p>  
                  </div>

                  <p>{s.makkia ? 'مكية' : "مدنية"}</p>
                  {/* <audio src={`${reciter.moshaf[0].server}${+su < 10 ? `00${su}` : +su < 100 ? `0${su}` : su }.mp3`} controls ></audio> */}
                </Link>
                ))
              }
            </div>
            
            <Outlet context={{name: reciter?.name, sora }} />
          </>
        }
      </div>
    </section>
  )}

export default React.memo(QuraaSwr)