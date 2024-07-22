import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import styles from './listen.module.css'
import { FaWindowClose } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';

type par = {
    idd : string,
    id : string
}

const Listen = () => {
    const [param,setparam] = useState(0)
    const {idd,id} = useParams<par>()
    const data : any = useOutletContext()
    const navigate = useNavigate()
    // const audioRef = useRef()
    useEffect(()=>{
        idd && setparam(Number(idd)) 
        data.name ? '' : navigate(`/quraa/${id}`)
    },[]) 

  return (
    <div className={styles.listenContainer}>
        <div className={styles.listencontent}>
            <FaWindowClose className={styles.close} onClick={()=>navigate(-1)} />
            <h1>{data?.name}</h1>
            <p>{data?.sora?.name}</p>
            <p>{data?.sora?.id}</p>
            <p>{data?.sora?.suraname}</p>
            <p>{data?.sora?.makkia ? 'مكية' : "مدنية"}</p>
            <audio src={`${data?.sora?.moshaf?.server}${param < 10 ? `00${param}` : +param < 100 ? `0${param}` : param}.mp3`} controls></audio>    
        </div>
    </div>
  )
}
 
export default Listen