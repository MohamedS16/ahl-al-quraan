import axios from "axios"
import { useEffect, useState } from "react"
import styles from './quraa.module.css'
import { Link } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import React from "react";

type recitersType = [{
    id : number,
    name : string,
    letter : string
}]

const Quraa = () => {

    const [reciters,setReciters] = useState <recitersType>([{}] as recitersType)
    const [loading,setLoading] = useState(true)
    const [searc,setSearch] = useState('')

    useEffect(()=>{
        axios.get('https://mp3quran.net/api/v3/reciters').then((res)=>{setReciters(res.data.reciters.sort((a : any,b : any) => (a.letter > b.letter) ? 1 : ((b.letter > a.letter) ? -1 : 0)));setLoading(false)}).catch((er)=>console.log(er))
    },[])

  return (
    <section className={styles.container}>
        <div className={styles.content}>
        <h1> القراء </h1>   

        <div className={styles.search}>
            <input type="text" placeholder="ابحث عن قارئ " onChange={(e)=>setSearch(e.target.value)} />
            <CiSearch />
        </div>
        {
            loading ? <p> يتم التحميل </p> :
            
                <>
                    <div className={styles.reciters}>
                    {reciters.filter((rec)=>{
                        if(searc === ''){
                            return rec
                        }else if(searc){
                            return rec.name.includes(searc)
                        }
                    }).map((r,idx,arr)=> {
                        return(
                        arr.length == 0 ?<p> لا يوجد قراء </p> : 
                        r.letter !== arr[idx - 1]?.letter ? 
                        <>
                        <p className={styles.letter}>{r.letter}</p>
                        <Link to={`${r.id}`} key={r.id}>{r.name}</Link>
                        </> : <Link to={`${r.id}`} key={r.id}>{r.name}</Link>
                        )
                    }
                    )
                    } 
                    </div>
                </>
            }
            
        </div>
    </section>
  )
}

export default React.memo(Quraa)
