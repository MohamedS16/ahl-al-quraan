import React, { useEffect, useState } from 'react'
import styles from './moshafSora.module.css'
import axios from 'axios'
import { Link, Outlet, useParams } from 'react-router-dom'
import changeNumbersToArabic from '../../utils/changeNumbersToArabic'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";


type soraDetails = {
    name : string,
    ayahs : [{
        text : string,
        page : number,
        number : number,
        numberInSurah : string
    }]
}

const MoshafSora = () => {

    const [sora,setSora] = useState<soraDetails>()
    const params = useParams()
    const [fontsize, setfontsize] = useState(20)
    const [isFontShown, setIsFontShown] = useState(true);

    useEffect(()=>{
        axios.get(`https://api.alquran.cloud/v1/surah/${params.id}`).then(res=>setSora(res.data.data)).catch(er=>console.log(er))
    },[])

  return (
    <section className={styles.moshafContainer}>
            <div className={styles.changeFontSize} style={isFontShown ? {} : {right : "-260px"}}>
                <p>حجم الخط : </p>
                <button onClick={()=>setfontsize(fontsize + 2)}> + </button>
                <p>{changeNumbersToArabic(`${fontsize}`)}</p>
                <button onClick={()=>fontsize > 11 && setfontsize(fontsize - 2) }> - </button>
                <FaAngleDoubleLeft title='اظهار حجم الخط' className={styles.changeFontBtns} style={isFontShown ? {display : 'none'} : {display : 'block'}} onClick={()=>setIsFontShown(!isFontShown)} />
                <FaAngleDoubleRight title='اخفاء حجم الخط' className={styles.changeFontBtns} style={!isFontShown ? {display : 'none'} : {display : 'block'}} onClick={()=>setIsFontShown(!isFontShown)} />
            </div>
        <div className={styles.moshafContent}>
            <h1> {sora?.name} </h1>
            {params.id !== '9' ? params.id === '1' ? '' : <p className={styles.basmala}>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</p> : '' }
            <div className={styles.soraText}>
                <p style={{fontSize : fontsize , lineHeight : `${fontsize * 2}px`}}>
                {
                    sora?.ayahs.map((s,idx)=><React.Fragment key={s.numberInSurah}><Link title='اضغط علي الاية لقرأة تفسيرها' to={`${s.numberInSurah}`} className={styles.ayah}> {params.id === '9' ? s.text : params.id === '1' ? s.text : idx === 0 ? s.text.split('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ')[1] : s.text} </Link> <span className={styles.ayahNumber}>{changeNumbersToArabic(`${s.numberInSurah}`)}</span> </React.Fragment>)
                }
                </p>
            </div>
        </div>

        <Outlet />
    </section>
  )
}

export default MoshafSora