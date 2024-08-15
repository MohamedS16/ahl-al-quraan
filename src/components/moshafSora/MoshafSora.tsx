import { useEffect, useState } from 'react'
import styles from './moshafSora.module.css'
import axios from 'axios'
import { Link, Outlet, useParams } from 'react-router-dom'
import changeNumbersToArabic from '../../utils/changeNumbersToArabic'

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



    useEffect(()=>{
        axios.get(`https://api.alquran.cloud/v1/surah/${params.id}`).then(res=>setSora(res.data.data)).catch(er=>console.log(er))
    },[])

  return (
    <section className={styles.moshafContainer}>
            <div className={styles.changeFontSize}>
                <p>حجم الخط : </p>
                <button onClick={()=>setfontsize(fontsize + 2)}> + </button>
                <p>{changeNumbersToArabic(`${fontsize}`)}</p>
                <button onClick={()=>fontsize > 11 && setfontsize(fontsize - 2) }> - </button>
            </div>
        <div className={styles.moshafContent}>
            <h1> {sora?.name} </h1>
            {params.id !== '9' ? params.id === '1' ? '' : <p className={styles.basmala}>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</p> : '' }
            <div className={styles.soraText}>
                <p style={{fontSize : fontsize , lineHeight : `${fontsize * 2}px`}}>
                {
                    sora?.ayahs.map((s,idx)=><><Link title='اضغط علي الاية لقرأة تفسيرها' to={`${s.numberInSurah}`} className={styles.ayah}>{params.id === '9' ? s.text : params.id === '1' ? s.text : idx === 0 ? s.text.split('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ')[1] : s.text}</Link> <span className={styles.ayahNumber}>{changeNumbersToArabic(`${s.numberInSurah}`)}</span></>)
                }
                </p>
            </div>
        </div>

        <Outlet />
    </section>
  )
}

export default MoshafSora