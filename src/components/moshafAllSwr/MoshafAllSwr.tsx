import axios from "axios"
import { useEffect, useState } from "react"
import styles from './moshafallswr.module.css'
import { Link } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import changeNumbersToArabic from "../../utils/changeNumbersToArabic";


type allSwr = [{
    end_page: number,
    id: number,
    makkia: number,
    name: string,
    start_page: number,
    type: number
}]

const MoshafAllSwr = () => {
    
    const [swr,setSwr] = useState<allSwr>()
    const [search,setSearch] = useState('')

    useEffect(()=>{
        axios.get('https://mp3quran.net/api/v3/suwar').then((resp)=>setSwr(resp.data.suwar)).catch((er)=>console.log(er))
    },[])

    return (
    <div className={styles.container}>
        <div className={styles.settings}>
            <h2> السور </h2>
            <div className={styles.search}>
                <input type="text" placeholder="ابحث عن سورة " onChange={(e)=>setSearch(e.target.value)} />
                <CiSearch />
            </div>
        </div>
        <div className={styles.content}>
        {
            swr ? swr.filter((ser)=>{
                if(search === ''){
                    return  ser
                }else if(search){
                    return ser.name.includes(search)
                }
            }).map((sura)=><Link className={styles.sora} key={sura.id} to={`${sura.id}`}> <div>{changeNumbersToArabic(`${sura.id}`)} - {sura.name}</div> <p>{sura.makkia ? 'مكية' : 'مدنية'}</p> </Link>) : <p> يتم التحميل </p>
        }
        </div>
    </div>
  )
}

export default MoshafAllSwr