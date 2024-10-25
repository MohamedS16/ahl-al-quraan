import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { FaWindowClose } from "react-icons/fa";
import { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from './listen.module.css'
import fileDownload from 'js-file-download'
import axios from 'axios';
// import changeNumbersToArabic from '../../utils/changeNumbersToArabic';

type par = {
    idd : string,
    id : string
}

type allData = {
    name : string,
    sora : {
        end_page : number,
        start_page : number,
        id : number,
        makkia : number,
        type : number,
        name : string,
        moshaf : {
            id : number,
            moshaf_type : number,
            surah_total : number
            name : string,
            server : string,
            surah_list : string
        }
    }
}

const Listen = () => {
    const [param,setparam] = useState(0)
    const {idd,id} = useParams<par>()
    const data : allData = useOutletContext()
    const navigate = useNavigate()

    const handleDownload = (link : string,name : string)=>{
        axios.get(link,{
            responseType : 'blob'
        }).then(res=>fileDownload(res.data,name))
    }

    useEffect(()=>{
        idd && setparam(Number(idd)) 
        data.name ? '' : navigate(`/quraa/${id}`)
    },[]) 

  return (
    <div className={styles.listenContainer}>
        <div className={styles.listencontent}>
            <FaWindowClose className={styles.close} onClick={()=>navigate(-1)} />
            <div className={styles.text}>
                <div className={styles.qarDetails}>
                    <h2>{data?.name}</h2>
                    <p>{data?.sora?.moshaf?.name}</p>
                </div>
                {/* <h3>{changeNumbersToArabic(`${data?.sora?.id}`)} - {data?.sora?.name} ({data?.sora?.makkia ? 'مكية' : "مدنية"}) </h3> */}
                
                <div className={styles.audiop}>
                    <AudioPlayer autoPlay={false} volume={0.5} src={`${data?.sora?.moshaf?.server}${param < 10 ? `00${param}` : +param < 100 ? `0${param}` : param}.mp3`} />    
                </div>
                <div className={styles.download}>
                    <button className='button' onClick={()=>handleDownload(`${data?.sora?.moshaf?.server}${param < 10 ? `00${param}` : +param < 100 ? `0${param}` : param}.mp3`,`${data?.sora?.name}.mp3`)} >  اضغط هنا لتحميل السورة </button>
                </div>
            </div>
        </div>
    </div>
  )
}
 
export default Listen