import { useEffect, useState } from 'react'
import styles from './content.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

type choices = {
  choices : {
    rewaya : string,
    lang : string
  }
}
type rec = [{
  id : number,
  letter : string,
  name : string,
  moshaf : [{
    name : string,
    server : string,
    surah_list : []
  }]
}]

const Content = (props : choices) => {

  const [reciters,setReciters] = useState<rec>([{}] as rec)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    
    axios.get(`https://mp3quran.net/api/v3/reciters?rewaya=${props.choices.rewaya}&language=${props.choices.lang}`)
    .then((res : any)=>{setReciters(res.data.reciters.sort((a : any,b : any) => (a.letter > b.letter) ? 1 : ((b.letter > a.letter) ? -1 : 0)));setLoading(false)})
    .catch(er=>console.log(er))

    

  },[props.choices])
  return (
    <div className={styles.content}>
        <h1> القراء </h1>
        {
          loading ? <p> يتم تحميل القراء </p> : <div className={styles.reciters}>
          {
            reciters[0].id ? 
            <>
            {
              reciters.map((r,idx)=>{
                if(r.letter !== reciters[idx - 1]?.letter){
                return(
                  <>
                  
                    <p className={styles.letter}>{r.letter}</p>
                  
                  <Link to={`${props.choices.lang}/${r.moshaf[0].name}/${r.id}`} key={r.id}>{r.name}</Link>
                  </>
                )
                }
                return(
                  <Link to={`${props.choices.lang}/${r.moshaf[0].name}/${r.id}`} key={r.id}>{r.name}</Link>
                )
              })
            }
            </> : <p>لا يوجد قراء </p>
          }
          </div>
        }
    </div>
  )
}

export default Content